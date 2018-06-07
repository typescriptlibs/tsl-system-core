/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import ICollection from './ICollection';
import IDictionaryEnumerator from './IDictionaryEnumerator';
import KeyValuePair from './KeyValuePair';
import Object from '../Object';

/**
 * Represents a generic dictionary.
 *
 * @extends ICollection
 */
export interface IDictionary<TKey extends Object, TValue extends Object>
	extends ICollection<KeyValuePair<TKey, TValue>>
{
	//////
	//
	//  Properties
	//
	//////

	/**
	 * A collection of every key in the IDictionary.
	 */
	keys: ICollection<TKey>;

	/**
	 * A collection of every value in the IDictionary.
	 */
	values: ICollection<TValue>;

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Adds a specified item to the IDictionary.
	 *
	 * @param {TKey} key
	 * The key of the item to add to the IDictionary.
	 *
	 * @param {TValue} value
	 * The value of the item to add to the IDictionary.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 *
	 * @exception {ArgumentException}
	 * An item with the same key already exists in the IDictionary.
	 *
	 * @exception {NotSupportedException}
	 * The IDictionary is read-only.
	 */
	addItem( key: TKey, value: TValue ): void;

	/**
	 * Tests whether an item with the specified key is part of the IDictionary.
	 *
	 * @param {TKey} key
	 * The key to locate in the IDictionary.
	 *
	 * @return {boolean}
	 * Returns true if the IDictionary contains an item with the key, otherwise
	 * false.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 */
	containsKey( key: TKey ): boolean;

	/**
	 * Returns an enumerator that moves through the IDictionary.
	 *
	 * @return {IDictionaryEnumerator}
	 * Returns the enumerator for the IDictionary.
	 */
	getEnumerator(): IDictionaryEnumerator<TKey, TValue>;

	/**
	 * Gets an item value in the IDictionary.
	 *
	 * @param {TKey} key
	 * The key of the item to get.
	 *
	 * @return {TValue}
	 * Returns the value of the item.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 *
	 * @exception {KeyNotFoundException}
	 * The key is not part of the IDictionary.
	 */
	item( key: TKey ): TValue;

	/**
	 * Removes the specified item from the IDictionary.
	 *
	 * @param {TKey} key
	 * The key of the item to remove from the IDictionary.
	 *
	 * @return {boolean}
	 * Returns true if the item was found and successfully removed, otherwise
	 * false.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 *
	 * @exception {NotSupportedException}
	 * The IDictionary is read-only.
	 */
	removeItem( key: TKey ): boolean;

	/**
	 * Gets the value of an item with the specified key.
	 *
	 * @param {TKey} key
	 * The key of the item, whose value is wanted.
	 *
	 * @param {(TValue|undefined)=>any} outValue
	 * Return the value of the item, or undefined.
	 *
	 * @return {boolean}
	 * When true is returned, the value of the item has been returned,
	 * otherwise false indicates a return of undefined.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 */
	tryGetValue( key: TKey, outValue: ( outValue: ( TValue | undefined ) ) => any ): boolean;
}

export default IDictionary;
