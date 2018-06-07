/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import IEnumerator from './IEnumerator';
import KeyValuePair from './KeyValuePair';
import Object from '../Object';

/**
 * Provides functions to iterate through a dictionary.
 *
 * @extends IEnumerator
 */
export interface IDictionaryEnumerator<TKey extends Object, TValue extends Object> extends IEnumerator<KeyValuePair<TKey, TValue>>
{
	//////
	//
	//  Properties
	//
	//////

	/**
	 * Gets the item at the current position of the dictionary.
	 *
	 * @exception {InvalidOperationException}
	 * The current position is out of the dictionary range.
	 */
	entry: KeyValuePair<TKey, TValue>;

	/**
	 * Gets the key at the current position of the dictionary.
	 *
	 * @exception {InvalidOperationException}
	 * The current position is out of the dictionary range.
	 */
	key: TKey;

	/**
	 * Gets the value at the current position of the dictionary.
	 *
	 * @exception {InvalidOperationException}
	 * The current position is out of the dictionary range.
	 */
	value: TValue;
}

export default IDictionaryEnumerator;
