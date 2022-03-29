Translate sections from OpenLR linear references to a target mapping network model
===================================================================
# Introduction

OpenLR is a dynamic location reference standard to enable systems to exchange location information in a map-agnostic manner. For further info see [OpenLR association](http://http://www.openlr.org/)

When an overall OpenLR reference is broken down further into linear sections, this library assists in assigning those sections to the mapping model the OpenLR references are decoded to.

TomTom was a founding member of the OpenLR association and use OpenLR references to provide location information for their traffic data. As such, this module, and example usage, is targetted towards decoding traffic data, however it should be suitable for all decoding applications. The author of this module has no association with TomTom International BV.

# Installation
Install the module with npm:

```
npm install openlr-translate-sections
```

# Import the module
For commonjs:
```javascript
const { validateInput, translate, baselineLength, harmonicAverage, translationInput } = require("openlr-translate-sections");
```
For typescript:
```typescript
import { validateInput, translate, baselineLength, harmonicAverage, translationInput } from "openlr-translate-sections";
```

# Example usage
Here we have an OpenLR reference describing a path 2000m length. The data provided against this OpenLR reference is broken into two sections described by chainages against the OpenLR reference.
![demo_slide](https://warerebel.github.io/openlr-translate-sections/docs/assets/images/slide1.png)

We describe this depicted relationship with a `translationInput` object:

```typescript
const translationInput: translationInput = {

} 
```
