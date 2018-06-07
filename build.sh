#!/usr/bin/env sh

###############################################################################
#                                                                             #
#  System Core TypeScript Library                                             #
#                                                                             #
#  Copyright (c) TypeScriptLibs and Contributors                              #
#                                                                             #
#  Licensed under the MIT License; you may not use this file except in        #
#  compliance with the License. You may obtain a copy of the MIT License at   #
#  https://typescriptlibs.org/LICENSE.txt                                     #
#                                                                             #
###############################################################################

cd "$(dirname "$0")/";
BASE="$(pwd)"

rm -rf \
"release/tsl-system-core/"* \
"release/tsl-system-core/"*.* \
"release/tsl-system-core/".??* \

TARGET="release/tsl-system-core/"

"./node_modules/.bin/tsc" \
--declaration \
--project "sources/" \

"./node_modules/.bin/tsc" \
--removeComments \
--project "sources/" \

"./node_modules/.bin/tsc" \
--module "amd" \
--moduleResolution "node" \
--removeComments \
--rootDir "sources/" \
--strict \
--target "es6" \
--outFile "${TARGET}client/tsl-system-core.js" \
"sources/index.ts"

"./node_modules/.bin/jsmin" \
--comment "/* System Core TypeScript Library; Copyright (c) TypeScriptLibs and Contributors; Licensed under the MIT License */" \
--level 3 \
"${TARGET}client/tsl-system-core.js" > "${TARGET}client/tsl-system-core.min.js"

cp "LICENSE.txt" "${TARGET}LICENSE.txt"
cp "publish.json" "${TARGET}package.json"
cp "README.txt" "${TARGET}README.txt"

cd "release"
tar -czf "tsl-system-core.tgz" "tsl-system-core"
openssl sha1 "tsl-system-core.tgz" > "tsl-system-core.sha1"
cat "tsl-system-core.sha1"
cd ..
