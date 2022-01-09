# part0

## HTML basics

paragraph - <p></p>
attribute in opening tag -  <p class="editor-note"></p>
    A space between it and the element name (or the previous attribute, if the element already has one or more attributes).
    The attribute name followed by an equal sign.
    The attribute value wrapped by opening and closing quotation marks.

empty elements - <img src="images/firefox-icon.png" alt="My test image">
    no closing </img> and no inner content. this is because an image element dosn't wrap content to affect it . its purpose is to embed an image in the html page in the palace it appears.

### anatomy of html doc
<!DOCTYPE html> - doctype, required preamble
<html></html> - wraps all the content on the entire page - root element
<head></head> - container for all the stuff you want to include on the html page that isn't the contemt you are showing to your pages viewers
<body></body> contains all the content that you want to show to web users


## css basics

selector {
    property: property value; <-declaration
}

selector defines element(s) to be styled

multiple selectors

p, li, h1 {
  color: red;
}

different types of selectors:

- element selector (p -> selects <p>)
- ID selector (#my-id selects <p id="my-di"> or <a id="my_id">)
- attribute selector ( img[ src ] -> selects <img src="myimage.png"> but no <img>)
- pseudo-class selector - selects the specified elements but only when in the specified state (for example when a cursor hovers over a link) (a:hover selects <a>, but only when the mouse pointer is hovering over the link)