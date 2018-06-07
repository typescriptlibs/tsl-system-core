/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import Object from '../Object';

/**
 * Provides functions to support the comparison of objects for equality in
 * some generic collections.
 */
export interface IEqualityComparer<T extends Object>
{
	/**
	 * Determines whether the specified objects are equal.
	 *
	 * @param {T} firstObject
	 * The first object to compare
	 *
	 * @param {T} secondObject
	 * The second object to compare.
	 *
	 * @return {boolean}
	 * True if the specified objects are equal, otherwise false.
	 */
	equals( firstObject: T, secondObject: T ): boolean;

	/**
	 * Returns a hash code for the specified object.
	 *
	 * @param {T} theObject
	 * The object for which a hash code has to be returned.
	 *
	 * @return {number}
	 * The hash code for the specified object.
	 */
	getHashCode( theObject: T ): number;
}

export default IEqualityComparer;
