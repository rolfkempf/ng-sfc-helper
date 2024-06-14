# Angular Single File Component Helper

## Description

This package is designed to move the contents of the components´ template files to the component definition block. It also allows to do the opposite. It runs on the whole angular codebase (that is all components under `src`) but the directory can also be set as an argument.

---

As of now the package has not been tested heavily (also there are no tests in the code). Feel free to use it but keep an eye on what is happening.

### But ... why?

As it happens I am the only one in my team who prefers working with SFCs and I needed a way to switch back and forth between both ways. So when I begin working I switch to SFCs. Then, before committing, I revert the components back.

## Installation

To install this package, run the following command:

```bash
npm install ng-sfc-helper --save-dev
```

After that you can add commands to your project´s `package.json` scripts block like this:

```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "inline-templates": "ng-sfc-helper toSfc", // make inline template
    "reverse-templates": "ng-sfc-helper toTemplate" // make tempalte files
  },
```

## Todo

- handle style files
- add tests (big files, huge projects, ...)
