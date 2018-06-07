/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import IEnumerator from './IEnumerator';
import Object from '../Object';

/**
 * Provides a function to move through the collection.
 */
export interface IEnumerable<T extends Object>
{
	//////
	//
	//  Functions
	//
	//////

	/**
	 * Performs specified actions for each item in the IEnumerable.
	 *
	 * @param {Delegate} delegate
	 * The function with specified actions for each item.
	 *
	 * @param {any} thisArg
	 * Sets the this-keyword in each function call.
	 */
	forEach<TReturn>( delegate: ( item: T, enumerable: IEnumerable<T> ) => ( TReturn | void ), thisArg?: any ): ( TReturn | undefined );

	/**
	 * Returns an enumerator that moves through the collection.
	 *
	 * @return {IEnumerator}
	 * Returns the enumerator for the collection.
	 */
	getEnumerator(): IEnumerator<T>;
}

export default IEnumerable;
