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

cd "$(dirname "$0")/"
BASE="$(pwd)"

rm -rf "release/tsl-system-core.test/"

TARGET="release/tsl-system-core.test/"

"./node_modules/.bin/tsc" \
--project "tests/" \

mkdir "release/tsl-system-core.test/node_modules/"
rsync -r "release/tsl-system-core/" "release/tsl-system-core.test/node_modules/tsl-system-core/"

node "release/tsl-system-core.test/index.js"
