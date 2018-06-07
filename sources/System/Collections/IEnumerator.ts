/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import IDisposable from '../IDisposable';

/**
 * Provides functions to iterate through a collection.
 *
 * @extends IDisposable
 */
export interface IEnumerator<T> extends IDisposable
{
	//////
	//
	//  Properties
	//
	//////

	/**
	 * The item at the current position of the collection, or undefined.
	 */
	current: ( T | undefined );

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Moves to the next position in the collection.
	 *
	 * @return {boolean}
	 * Returns true, if next position was found, otherwise false.
	 */
	moveNext(): boolean;

	/**
	 * Resets the position to the beginning of the collection.
	 */
	reset(): void;
}

export default IEnumerator;
