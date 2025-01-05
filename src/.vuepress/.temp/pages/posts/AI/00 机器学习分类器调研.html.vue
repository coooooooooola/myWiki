<template><div><blockquote>
<p>项目中的第三部分需要对各类预处理后的入侵事件实现精准&amp;快速识别，这需要借助机器学习算法完成。浅浅调研下常见的分类器算法：人工神经网络、SVM 向量机、Random Forest、Adaboost</p>
</blockquote>
<h2 id="rbf-神经网络" tabindex="-1"><a class="header-anchor" href="#rbf-神经网络"><span>RBF 神经网络</span></a></h2>
<blockquote>
<p>实验室正在使用的分类器</p>
</blockquote>
<p>RBF 神经网络属于一种单隐层的前馈网络，每一层的神经元的输出作为下一层神经元的输入，隐层神经元激活函数采用径向基函数，最终的输出层是对隐层神经元输出的加权组合。</p>
<p>图示描述了 RBF 神经网络的结构。它主要包含三层：输入层（Q 个特征输入$( p_0, p_1, \ldots, p_{Q-1} )$）、中间单隐层以及输出层（m 个输出$( z_0, \ldots, z_{m-1} )$）。输入层即特征提取阶段获得的入侵信号特征向量，将它们送入隐层的 h 个神经元中训练相关参数，最终结果在输出层通过参数的加权求和得到。此结构下的 RBF 神经网络输出可以表示为</p>
<p>$$<br>
y_i = \sum_{j=1}^{h} W_{j,i} \varphi(F, c_j) \tag{5-11}<br>
$$</p>
<p>其中，$h$为隐层个数，$c_j$为第$j$个神经元的中心，$W_{j,i}$代表$j$第$j$个神经元与第$i$个输出之间的权重值，$\varphi(F, c_j)$是径向基函数，它通常被定义为样本输入$F$到数据中心$c_j$之间的欧氏距离，一般使用高斯径向基函数形如</p>
<p>$$<br>
\varphi(F, c_j) = \exp \left[ - \frac{||F - c_j||<sup>2}{2\sigma_j</sup>2} \right] \tag{5-12}<br>
$$</p>
<p>在训练阶段，当第 i 类事件的特征被送入神经网络，则输出层被标记为 1，其他输出均被标记为 0。包含 m 种事件的特征向量量送入网络后首先通过聚类法。随后机器算法确定各神经元的中心$c_j$，然后再用 BP 算法确定参数$W_{j,i}$和$\sigma_j$。在测试阶段，当一个未知入侵事件类型的特征向量量$F$已经训练好的网络后，将同时获得$m$个输出，其中最接近于 1 的那个输出即代表入侵事件的种类。</p>
<p>![截屏2024-07-14 17.09.05](/Users/swtywang/Library/Application Support/typora-user-images/截屏 2024-07-14 17.09.05.png)</p>
<h2 id="支持向量机-svm" tabindex="-1"><a class="header-anchor" href="#支持向量机-svm"><span>支持向量机 SVM</span></a></h2>
<blockquote>
<p>机器学习算法之一，于 1995 年提出（《<strong>Support-Vector Networks</strong> 》）。初期调研时发现在解决小样本、非线性及高维模式识别中具有一些特有优势，属于一个常用的二元分类器 应用广泛，很适合作为入侵模式识别 part 的工具，学习一下。</p>
</blockquote>
<h3 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h3>
<ul>
<li>算法目标：支持向量机（Support Vector Machine，SVM）是一种监督学习模型，广泛用于分类和回归分析。SVM 的主要目标是找到一个最佳的超平面，以最大化类别之间的间隔。（最终转化为凸二次规划问题）</li>
<li>中心思想：SVM 的基本思想是通过寻找一个最优超平面(optimal hyperplane)来将不同类别的数据点分开。对于线性可分的数据集，SVM 尝试找到一个将数据点完全分开的超平面。对于线性不可分的数据，SVM 引入了一组松弛变量来允许一些数据点违背间隔规则，同时通过引入核函数来处理非线性问题。</li>
</ul>
<p>![image-20240713234932372](/Users/swtywang/Library/Application Support/typora-user-images/image-20240713234932372.png)</p>
<p>$$<br>
\begin{equation}<br>
\begin{aligned}<br>
\min_{w, b, \xi} &amp; \quad \frac{1}{2} w^T w + C \sum_{i=1}^{M} \xi_i \<br>
\text{subject to} &amp; \quad y_i (w^T \phi(F_i) + b) \geq 1 - \xi_i, \<br>
&amp; \quad \xi_i \geq 0.<br>
\end{aligned}<br>
\end{equation}<br>
$$</p>
<h3 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念"><span>核心概念</span></a></h3>
<h4 id="超平面" tabindex="-1"><a class="header-anchor" href="#超平面"><span>超平面</span></a></h4>
<p>在一个二维空间中，超平面是将空间分成两个部分的一条直线。在更高维度的空间中，超平面是一个维度比空间低一维的子空间。对于一个 ddd 维空间，一个超平面可以表示为：</p>
<p>$$<br>
w^T x + b = 0<br>
$$</p>
<p>其中，$w^T $ 是法向量，决定了超平面的方向，$b$ 是偏置项，决定了超平面与原点的距离。</p>
<h4 id="margin" tabindex="-1"><a class="header-anchor" href="#margin"><span>Margin</span></a></h4>
<p>间隔是指数据点到超平面的最短距离。SVM 的目标是最大化最小间隔，称为硬间隔最大化。对于线性可分的情况，这个最优超平面能够确保所有数据点都被正确分类，并且到超平面的距离最大化。</p>
<h4 id="松弛变量" tabindex="-1"><a class="header-anchor" href="#松弛变量"><span>松弛变量</span></a></h4>
<p>对于线性不可分的情况，SVM 引入了松弛变量 $\xi_i$来允许一些数据点违背间隔规则。</p>
<p>$$<br>
\min_{w, b, \xi} \quad \frac{1}{2} w^T w + C \sum_{i=1}^{M} \xi_i<br>
$$</p>
<p>其中，$C$ 是惩罚参数，控制松弛变量的惩罚力度。</p>
<h4 id="核函数" tabindex="-1"><a class="header-anchor" href="#核函数"><span>核函数</span></a></h4>
<p>核函数的引入是为了处理非线性可分的数据。通过将数据映射到一个高维空间，使得在这个空间中数据变得线性可分。常见的核函数包括：线性核、多项式核、高斯核（RBF）</p>
<h3 id="数学模型" tabindex="-1"><a class="header-anchor" href="#数学模型"><span>数学模型</span></a></h3>
<h4 id="原始问题" tabindex="-1"><a class="header-anchor" href="#原始问题"><span>原始问题</span></a></h4>
<p>对于线性可分的情况，SVM 的优化问题可以表示为：</p>
<p>$$<br>
\min_{w, b} \quad \frac{1}{2} w^T w<br>
$$</p>
<p>$$<br>
\text{subject to} \quad y_i (w^T x_i + b) \geq 1, \quad i = 1, 2, \ldots, M<br>
$$</p>
<p>对于线性不可分的情况，引入松弛变量后优化问题变为：</p>
<p>$$<br>
\min_{w, b, \xi} \quad \frac{1}{2} w^T w + C \sum_{i=1}^{M} \xi_i<br>
$$</p>
<p>$$<br>
\text{subject to} \quad y_i (w^T x_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0, \quad i = 1, 2, \ldots, M<br>
$$</p>
<p>我们可以由此获得一个 SVM 模型，该模型由权重向量$w$和常量$b$表示，由此可以确定一个超平面($w$, $b$)。</p>
<h4 id="对偶问题" tabindex="-1"><a class="header-anchor" href="#对偶问题"><span>对偶问题</span></a></h4>
<p>通过拉格朗日乘子法，可以将原始问题转化为对偶问题。对于线性可分的情况，对偶问题为：</p>
<p>$$<br>
\max_{\alpha} \quad \sum_{i=1}^{M} \alpha_i - \frac{1}{2} \sum_{i=1}^{M} \sum_{j=1}^{M} \alpha_i \alpha_j y_i y_j x_i^T x_j<br>
$$</p>
<p>$$<br>
\text{subject to} \quad \sum_{i=1}^{M} \alpha_i y_i = 0, \quad \alpha_i \geq 0, \quad i = 1, 2, \ldots, M<br>
$$</p>
<h3 id="svm-如何实现多类问题的分类" tabindex="-1"><a class="header-anchor" href="#svm-如何实现多类问题的分类"><span>SVM 如何实现多类问题的分类？</span></a></h3>
<p>Multi-class classification 近年有很多解决方案</p>
<ul>
<li>
<p>在 Twin Support Vector Machines for Pattern Classification](<a href="https://ieeexplore.ieee.org/abstract/document/4135685/" target="_blank" rel="noopener noreferrer">https://ieeexplore.ieee.org/abstract/document/4135685/</a> )</p>
</li>
<li>
<p><a href="https://citeseerx.ist.psu.edu/document?repid=rep1&amp;type=pdf&amp;doi=1752f10bf93e9011c011d8d2c1ae056d2d0deace#page=625" target="_blank" rel="noopener noreferrer">Classification and grading rice using multi-class SVM</a></p>
</li>
<li>
<p><a href="https://link.springer.com/article/10.1007/s00521-012-1108-x" target="_blank" rel="noopener noreferrer">Multiple birth support vector machine for multi-class classification</a></p>
</li>
<li>
<p><a href="https://sci2s.ugr.es/ovo-ova" target="_blank" rel="noopener noreferrer">An overview of ensemble methods for binary classifiers in multi-class problems: Experimental study on one-vs-one and one-vs-all schemes</a></p>
</li>
</ul>
<p>one-vs-all(OVA)： 假设<em>Q</em>类事件需要识别(<em>Q</em> &gt; 2)。对第<em>q</em> 类事件来说$(q = 1, 2, . . . Q)$，我们可以得到它的 SVM 模型$(w_q,b_q)$。在测试阶段，给定一个未知事件的特征向量(例$[K_0,K_1,K_2,K_3,ZCR]$)，我们可以获得来自这<em>Q</em>个模型的<em>Q</em>个输出$z_q$​。最终，我们将该未知事件认定为具有最大决策值的那一类事件。即</p>
<p>$$<br>
c = \arg\max_{q=0,\ldots,Q-1} z_q.<br>
$$</p>
<h3 id="使用结论" tabindex="-1"><a class="header-anchor" href="#使用结论"><span>使用结论</span></a></h3>
<p>相比于现有的 RBF 神经网络方案，SVM 进需要更小的样本即可实现一个精度较高的分类器（待验证），具有全局最优、泛化能力强的优点，值得一试。</p>
<h2 id="随机森林" tabindex="-1"><a class="header-anchor" href="#随机森林"><span>随机森林</span></a></h2>
<p>TODO</p>
<h2 id="adaboost" tabindex="-1"><a class="header-anchor" href="#adaboost"><span>Adaboost</span></a></h2>
<p><a href="https://github.com/hetianch/AdaBoost" target="_blank" rel="noopener noreferrer">https://github.com/hetianch/AdaBoost</a></p>
</div></template>


