---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---
<style scoped>
  .no-underline a {
    text-decoration:none;
  }
</style>
<div class="no-underline" markdown="1">

1. <b>AsymQ: Asymmetric Q-Loss to mitigate overestimation bias in off-policy reinforcement learning</b><br/>
  <small>Qinsheng Zhang*, <b>Arjun Krishna*</b>, Sehoon Ha, Yongxin Chen<br/>
  (accepted at NeurIPS-W 2022 - Deep RL workshop)<br/>
  [**[pre-print]**](https://openreview.net/forum?id=KoRdlJjgiQ) [**[poster]**](/files/asymq-poster.png) <br/>
  [<i>developed as a part of CS8803-RLR Spring 2022 - awarded best paper in class</i>]</small>

1. <b>The Effect of Robot Skill Level and Communication in Rapid, Proximate Human-Robot Collaboration</b><br/>
   <small>Kin Man Lee\*, <b>Arjun Krishna\*</b>, Zulfiqar Zaidi, Rohan Paleja, Letian Chen, Erin Hedlund-Botti, Mariah Schrum, Matthew Gombolay<br/>
  (accepted at HRI 2023 ; acceptance rate 25.2% (250 submissions)) <br/>
  [**[pdf]**](https://bpb-us-w2.wpmucdn.com/sites.gatech.edu/dist/d/958/files/2023/01/HRI2023_Ping_Pong_colab_final.pdf)
  [**[poster @ IRIM - Industry Day]**](/files/poster-IRIM-AgileHRC.png)</small>

1. <b>Utilizing Human Feedback for Primitive Optimization in Wheelchair Tennis</b><br/>
   <small><b>Arjun Krishna</b>, Zulfiqar Haider Zaidi, Letian Chen, Rohan R Paleja, Esmaeil Seraj, Matthew Gombolay<br/>
   (accepted at CoRL-W 2022 - Learning for Agile Robots)<br/>
   [**[poster]**](/files/poster-ESTHER-ProMP.png) [**[arxiv]**](https://arxiv.org/abs/2212.14403) [**[project-page]**](/project/promp_utilize_feedback)</small>

2. <b>Athletic Mobile Manipulator System for Robotic Wheelchair Tennis</b> <br/>
   <small>Zulfiqar Zaidi\*, Daniel Martin\*, Nathaniel Belles, Viacheslav Zakharov, <b>Arjun Krishna</b>, Kin Man Lee, Peter Wagstaff, Sumedh Naik, Matthew Sklar, Sugju Choi, Yoshiki Kakehi, Ruturaj Patil, Divya Mallemadugula, Florian Pesce, Peter Wilson, Wendell Hom, Matan Diamond, Bryan Zhao, Nina Moorman, Rohan Paleja, Letian Chen, Esmaeil Seraj, Matthew Gombolay <br/>
   (To appear in IEEE RA-L)<br/>
   [**[arxiv]**](https://arxiv.org/abs/2210.02517v1) [**[project-page]**](https://core-robotics-lab.github.io/Wheelchair-Tennis-Robot/) [**[poster @ IRIM - Industry Day]**](/files/poster-IRIM-ESTHER.png)</small>


</div>

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
