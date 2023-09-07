<script setup>
import { ref, onMounted } from "vue";
const canvasId = ref("");

let currInterval;

onMounted(() => {
  var c = canvasId.value;
  var ctx = c.getContext("2d");

  //making the canvas full screen
  c.height = window.innerHeight;
  c.width = window.innerWidth;

  //chinese characters - taken from the unicode charset
  var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
  //converting the string into an array of single characters
  matrix = matrix.split("");

  var font_size = 20;
  var columns = screen.availWidth / font_size; //number of columns for the rain
  //an array of drops - one per column
  var drops = [];
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for (var x = 0; x < columns; x++)
    drops[x] = 1;

  let prevt = performance.now();

  function animate({ timing, draw, duration, infinite }) {

    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1

      // calculate the current animation state

      let dt = time - prevt;
      prevt = time;

      draw(dt); // draw it

      if (infinite) {
        requestAnimationFrame(animate);
      }

    });
  }

  //drawing the characters
  let t = 0;
  function draw(dt) {
    //Black BG for the canvas
    //translucent BG to show trail
    if (t > 30) {
      t = 0;
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, c.width, c.height);


      ctx.fillStyle = "#005234";//green text
      ctx.font = font_size + "px arial";
      //looping over drops
      for (var i = 0; i < drops.length; i++) {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
          drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
      }
    } else {
      t += dt;
    }

  }


  currInterval = animate({
    duration: 1000,
    timing(tf) { return tf / 2 },
    draw,
    infinite: true,
  });
  window.onresize = () => {
    c.height = window.innerHeight;
    c.width = window.innerWidth;
  }
})
</script>

<template>
  <canvas id="c" ref="canvasId"></canvas>
</template>


<style scoped>
#c {
  position: fixed;
  z-index: 1;
  top: 0;
}
</style>