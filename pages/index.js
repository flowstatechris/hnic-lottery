import Header from '../components/Header'
import PotCard from '../components/PotCard'
import Table from '../components/Table'
import UserCard from '../components/UserCard'
import React from 'react';

import style from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
      
   
<div class="tenor-gif-embed" data-postid="18064089" data-share-method="host" data-aspect-ratio="1" data-width="100%" style="height: 200px; width: 200px;">
  <a href="https://tenor.com/view/lotto-gif-18064089">Lotto Sticker</a>from <a href="https://tenor.com/search/lotto-stickers">Lotto Stickers</a>
</div>
<script type="text/javascript" async src="https://tenor.com/embed.js"></script>

<div class="tenor-gif-embed" data-postid="24584585" data-share-method="host" data-aspect-ratio="0.54375" data-width="100%" style="height: 150px; width: 150px;">
  <a href="https://tenor.com/view/money-gif-24584585">Money GIF</a>from <a href="https://tenor.com/search/money-gifs">Money GIFs</a>
</div>
<script type="text/javascript" async src="https://tenor.com/embed.js"></script>
<div style={{ position: 'relative', top: '50px', left: '50px' }}>
      <h2>Video Player</h2>
      <video width="320" height="240" controls>
        <source src="myVideo.mp4" type="video/mp4" />
        <source src="myVideo.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div style={{ position: 'relative', top: '50px', left: '50px' }}>
      <h2>Video Player</h2>
      <video width="320" height="240" controls>
        <source src="myVideo.mp4" type="video/mp4" />
        <source src="myVideo.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>

      <PotCard />
      <UserCard />
      <Table />
    </div>
  )
}





