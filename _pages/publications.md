---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

## Under review

1. <b>AsymQ: Asymmetric Q-Loss to mitigate overestimation bias in off-policy reinforcement learning</b><br/>
  <small>Qinsheng Zhang, <b>Arjun Krishna</b>, Sehoon Ha, Yongxin Chen<br/>
  (<i><u>under review at ICLR 2023</u>; developed as a part of CS8803-RLR Spring 2022 - awarded best paper in class</i>)</small>

2. <b>The Effect of Robot Skill Level and Communication in Rapid, Proximate Human-Robot Collaboration</b><br/>
   <small><b>Arjun Krishna\*</b>, Kin Man Lee\*, Zulfiqar Zaidi, Rohan Paleja, Letian Chen, Erin Hedlund-Botti, Mariah Schrum, Matthew Gombolay<br/>
  (<i><u>under review at HRI 2023</u></i>)</small>

3. <b>Athletic Mobile Manipulator System for Robotic Wheelchair Tennis</b> <br/>
   [[arxiv]](https://arxiv.org/abs/2210.02517v1) [[webpage]](https://core-robotics-lab.github.io/Wheelchair-Tennis-Robot/) <br/>
   <small>Zulfiqar Zaidi\*, Daniel Martin\*, Nathaniel Belles, Viacheslav Zakharov, <b>Arjun Krishna</b>, Kin Man Lee, Peter Wagstaff, Sumedh Naik, Matthew Sklar, Sugju Choi, Yoshiki Kakehi, Ruturaj Patil, Divya Mallemadugula, Florian Pesce, Peter Wilson, Wendell Hom, Matan Diamond, Bryan Zhao, Nina Moorman, Rohan Paleja, Letian Chen, Esmaeil Seraj, Matthew Gombolay <br/>
   (<i><u>under review at RA-L</u></i>)</small>




{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
