tsl-system-core preview
=======================
System Core TypeScript Library

Requirements
------------
This package is compatible to
- ECMAScript 6.0 and later
- Node.js 6.8 and later
- RequireJS 2.0 and later
- TypeScript 2.3 and later

Installation
------------
npm i https://typescriptlibs.org/npm/tsl-system-core.tgz --save-dev

Update
------
npm i tsl-system-core

Configuration
-------------
On client side you have to configure RequireJS to find the package:
require.config({
    paths: {
        'tsl-system-core': 'libs/tsl-system-core.min',
    }
});

Usage
-----
import * as System from 'tsl-system-core';

Source Code
-----------
git clone https://typescriptlibs.org/git/tsl-system-core.git