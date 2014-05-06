slides.html
=============

An HTML5 based slide deck framework, based on web components.
Some web components for making a neat slide deck with live demos.

[You can see a demo here](http://avgp.github.io/slides.html/).

Here is a sample presentation:

```html
    <!doctype html>
    <html>
      <head>
        <title>Some presentation</title>
        <link rel="import" href="components/x-deck/x-deck.html">
        <link rel="import" href="components/x-slide.html">
        <link rel="import" href="components/x-demo/x-demo.html">
        <style>
          html, body {
            width:  100%; 
            height: 100%;

            padding: 0;
            margin:  0;
          }
        </style>
      </head>
      <body>
        <x-deck>
          <x-slide class="active">
            <h1>Welcome to the presentation of the future</h1>
            <h2>Web components for more semantics in HTML slide decks</h2>
          </x-slide>
          
          <x-slide class="active">
            <h1>Let's show some funny images</h1>
            <div style="text-align: center">
              <img src="http://www.best-gif.com/wp-content/uploads/2014/02/funny-gifs-Worst-end-of-a-Mario-World-ever.gif">
            </div>
          </x-slide>

          <x-slide class="active">
            <h1>Live coding demo</h1>
            <x-demo src="demo.html"></x-demo>
          </x-slide>
          
        </x-deck>
      </body>
    </html>
```
