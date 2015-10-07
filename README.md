#Steps required to run the application

Optimized files are located in **dist** folder for both parts of the project. 

1.To run the speed score from PageSpeed Insights, a local server  is required to expose the project files to internet and you can run a local server

```
$> cd /path/to/your-project-folder
$> python -m SimpleHTTPServer 8080
```
2. Open another terminal window and make your local server accessible remotely.(ngrok file is already available in dest folder)

```
$> cd /path/to/your-project-folder
$> ./ngrok http 8080
```

#Optimization steps for increasing PageSpeed score
-Inlined the minified CSS style.css file and loading the CSS asynchronously using gulp-critical plugin.
- Added `media="print"' for non-render blocking CSS resources.
- Added `async` attribute on script tag for JS files which are not manipulating DOM.
- Reduced the size of pizzeria.jpg image using grunt-responsive image plugin
- Used Web font loader JS library for loading google font and loading the web font asynchronously.


#Optimization steps for pizza.html
Steps taken to optimize the web page for 60FPS (frames per second) during scroll event are as follows:-(**pizza.html file is located in *dist* folder**).

##Reducing the Scripting Time

- Reducing the number of sliding pizza from 200 to 25. Dynamically creating sliding pizza based on the size of the screen of the device.

-Replacing `document.querySelectorAll()` with `document.getElementsByClassName/ document.document.getElementById`. `document.querySelectorAll()` is slower as it returns a `StaticNodeList` that is just a snapshot of DOM unaffected by changes. Whereas, document.getElementsByClassName/ document.document.getElementById` returns a `DynamicNodeList` which is a live version of DOM and changes to DOM will be automatically reflected in the collection.

- `i % 5` will always return 0,1,2,3,4 reminder for every scroll and thus it is not necessary to calculate its value for 25 sliding pizzas during every scroll. Removing this line `var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));` inside the for-loop and creating an array of five unique values `i % 5` produces as shown below. 

```
for (var i = 0; i < 5; i++){
    phase.push(Math.sin(docScroll + i) * 300);
  }
```

##Reducing the Painting Time:

-Changing the width of every sliding pizza which will trigger layout changes and hence also triggers paint changes on the whole HTML document. Painting the whole document for every pizza leads to bad performance. This can be solved if forcing each sliding pizza to paint on its own composite layer by the use of `transform: translate3d(0,0,0);`. 

Transform CSS property tend to be more performant than other layout changes because Transform do not affect any other element so no element in the vicinity gets affected. and browser only repaints the part of the screen that contains transformed content.

Furthermore, with **tanslate3d** transform, your animation is run in hardware mode on the GPU(Graphics Processing Unit) and thus frees up CPU of the device to handle other tasks.Thus, with this particular transform, you get the added advantage of having all of the work be done by GPU.


Thus, when we scroll, the browser will only repaint the pixels that are affected by the moving pizza, and therefore will not repaint the whole screen and also reducing the total paint time drastically and increasing FPS. 