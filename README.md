openlr-translate-sections
=========================
Translate sections from OpenLR linear references to a target mapping network model

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
const inputObject: translationInput = {
    "cost": 2000, // Total OpenLR section length - For reference only, is not used by the module
    "openLR": "xyz", // OpenLR reference - For reference only, is not used by the module
    "fromModel": [
        {
            "linkid": "Section1",
            "length": 800,
            "value": 70
        },
        {
            "linkid": "Section2",
            "length": 1200,
            "value": 110
        }
    ],
    "toModel": [
        {
            "linkid": "{abcd}",
            "length": 600,
            "link": [],
            "endChainage": []
        },
        {
            "linkid": "{efgh}",
            "length": 650,
            "link": [],
            "endChainage": []
        },
        {
            "linkid": "{ijkl}",
            "length": 750,
            "link": [],
            "endChainage": []
        }
    ]
} 
```
We need to ensure that the input and output models are the precise same length and we use the `baslineLength` function to adjust the lengths to match if needed.
```typescript
const adjustedObject = baselineLength(inputObject);
```
We can now generate an output file that has aligned the OpenLR sections to our target model.
```typescript
const translatedObject = translate(adjustedObject);
```
The translated output is not reproduced here for brevity, but an example can be viewed at the end of this document [here](#translation-output). This output contains relationships between the OpenLR sections and the target model and can have useful applications of its own prior to averaging out the data.

Finally we can apply a harmonic average on the translated object to generate a distinct output value for each link.
```typescript
const translatedWithValues = harmonicAverage(translatedObject);
```
The final `translatedWithValues` output will be:
```json
{
    "cost": 2000,
    "openLR": "xyz",
    "items": [
        {
            "linkid": "{abcd}",
            "length": 600,
            "value": 70.0
        },
        {
            "linkid": "{efgh}",
            "length": 650,
            "value": 97.7
        },
        {
            "linkid": "{ijkl}",
            "length": 750,
            "value": 110.0
        }
    ]
}
```
# Other utilities
There are requirements which the `inputObject` must satisfy for the translation to be successful. The target mapping links should be whole links matching the OpenLR section, i.e. no partial links. As the OpenLR specfiication decodes against nodes the result of a decode is expected to always be a whole set of links.

The translation object expects the inputs to be the precise same length, we can adjust the lengths with the `baselineLength` function. Prior to calling baslineLength we can check that the lengths of our input and output models are within an acceptable tolerance for us. This also validates that the model input is well formed.

The `validateInput` function should be called with our input model and our tolerance for differing lengths between the two models. The tolerance value is a percentage difference we accept in the lengths.

```typescript
// Validate that our inputObject is well formed and that the total input and output lengths are within 5% of each other
try{
    validateInput(inputObject, 5);
} catch(error) {
    console.log(error.message); // If out of tolerance - "The toModel length varies outside of tolerance from the fromModel length"
}
```

# Translation Output
The output of the translate function in our example is as follows:

```json
{
    "cost": 2000,
    "openLR": "xyz",
    "fromModel": [
        {
            "linkid": "1234",
            "length": 800,
            "value": 70
        },
        {
            "linkid": "5678",
            "length": 1200,
            "value": 110
        }
    ],
    "toModel": [
        {
            "linkid": "{abcd}",
            "length": 600,
            "endChainage": [600],
            "link": ["1234"]
        },
        {
            "linkid": "{efgh}",
            "length": 650,
            "endChainage": [200, 650],
            "link": ["1234", "5678"]
        },
        {
            "linkid": "{ijkl}",
            "length": 750,
            "endChainage": [750],
            "link": ["5678"]
        }
    ]
}
```
Here the input linkids have been mapped to a chainage on each of the output links.

e.g. link "{efgh}" has the value from input link "1234" for chainage 0 to 200 and has the value from link "5678" for chainage 200 to 650.
