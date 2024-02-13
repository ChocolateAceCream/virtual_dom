# Virtual DOM
1.  represent html using js obj, then build a DOM tree using that js obj and insert into the actual page
2. when status changed, generate a new js representation of DOM tree, and then compare to the old one, mark the difference
3. apply the difference to the real DOM tree, so view got updated

virtual DOM can be seen as a cache layer between JS and DOM. JS control the virtual DOM and final change in virtual DOM will be reflected on DOM at final stage.