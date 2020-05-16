## NgxPaging

Angular paging component

### NPM package
  
    install npm ngx-paging

### Dependency
Angular version 9.1.5 or up.

### Features

 1. **Show on need** <br/> When there is no need for paging at all (for example the items which need to display less than the page size) then the `HTML` component will disappear. <br/>
This will be established by statement `shouldPagingComponentBeHidden`. <br/>
you can set the property `showComponentAlways` to `true` to always show the component, even if there is neeed for showing the pages.

 2. **Disable on need** <br/>
for example, if you are already selected the last page, why the `last page` or the `Next` button should be available to press? <br/>
*I am handling this and in that case I am disabling those buttons by applying `disabled` class on those buttons`<br/>

 3. **Distinguish the Selected page** <br/>
a special class (in this case called `active` class) is applied on the selected page, to make the user know in which page he/she is right now. <br/> 
This is established by the applying the `active` class

 4. **Last & First** <br />
going to the first and last page is also available by simple buttons dedicated to this.

 5. **Limits for displayed buttons** <br/>
Suppose you have a lot of pages, for example 1000 pages, then what will happened? would you display them all for the user ? *absolutely not* <br/>
you have to display just a few of them according to the current page. for example showing 3 pages before the current page and other 3 pages after the selected page. <br/>
This case has been handled here `generatePages` <br>
the `generatePages` function applying a simple algorithm to determine if we need to show all the pages (the page count is under the threshold, which could be determined easily), or to show just some of the buttons. <br/>
you can determine the threshold by changing the value of the `maxPageCount ` variable <br/>
Right now I assigned it as the following `maxPageCount = 7;` which mean that no more than 7 buttons could be displayed for the user (3 before the SelectedPage, and 3 after the Selected Page) and the Selected Page itself. <br/><br/>
You may wonder, what if there was not enough pages after **OR** before the current page to display? *do not worry I am handling this in the algorithm* <br/> for example, if you have `11 pages` and you have `maxPageCount = 7` and the current `selected page is 10`, Then the following pages will be shown <br/><br/>
`5,6,7,8,9,10(selected page),11` <br/><br/>
so we always stratifying the `maxPageCount`, in the previous example showing `5` pages before the selected page and just `1` page after the selected page.

 6. **Selected Page Validation** <br/>
All set operation for the `currentPage` get property *which determine the selected page by the user*, is go through the validation. <br/>
the validation will check that before setting the value we make sure that we will not go beyond the available pages.

**NOTE 1** <br/>
You may noticed that I am using some `bootstrap` classes in this component, 
This is suitable for me, but *of course* you can use your own classes instead of the bootstrap classes. <br/>
The bootstrap classes which I used here are `pagination`, `pagination-sm`, `active` and `disabled` <br/>
Feel free to change them as you need.

## Contrinution
PRs is more than welcome<br/>
No specific style is needed, your code will be refactored anyway, so use the style which you love
