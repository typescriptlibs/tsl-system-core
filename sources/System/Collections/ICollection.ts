/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import Object from '../Object';
import IEnumerable from './IEnumerable';

/**
 * Represents a generic ICollection of items.
 *
 * @extends IEnumerable
 */
export interface ICollection<T extends Object> extends IEnumerable<T>
{
	//////
	//
	//  Properties
	//
	//////

	/**
	 * The number of items in the ICollection.
	 */
	count: number;

	/**
	 * Indicates whether the ICollection is read-only.
	 */
	isReadOnly: boolean;

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Adds a new item to the ICollection.
	 *
	 * @param {T} item
	 * The item to add to the ICollection.
	 *
	 * @exception {NotSupportedException}
	 * The ICollection is read-only.
	 */
	add( item: T ): void;

	/**
	 * Removes all items from the ICollection.
	 *
	 * @exception {NotSupportedException}
	 * The ICollection is read-only.
	 */
	clear(): void;

	/**
	 * Tests whether an item is part of the ICollection.
	 *
	 * @param {T} item
	 * The item to locate in the ICollection.
	 *
	 * @return {boolean}
	 * Returns true if the item has been found in the ICollection, otherwise
	 * returns false.
	 */
	contains( item: T ): boolean;

	/**
	 * Copies items of the ICollection to a specified array, starting at a
	 * specified index of the array.
	 *
	 * @param {T[]} array
	 * The array as destination of the items, that are copied from ICollection.
	 *
	 * @param {number} arrayIndex
	 * The zero-based index of the array, at which to start with inserting the
	 * copied items.
	 *
	 * @exception {ArgumentNullException}
	 * The array is null.
	 *
	 * @exception {ArgumentOutOfRangeException}
	 * The array index is less than zero.
	 *
	 * @exception {ArgumentException}
	 * The number of items in the ICollection is greater than the available
	 * space from arrayIndex to the end of the array.
	 */
	copyTo( array: T[], arrayIndex: number ): void;

	/**
	 * Removes an item from the ICollection.
	 *
	 * @param {T} item
	 * The item to remove from the ICollection.
	 *
	 * @return {boolean}
	 * Returns true if the item was found and successfully removed from the
	 * ICollection, otherwise false.
	 *
	 * @exception {NotSupportedException}
	 * The ICollection is read-only.
	 */
	remove( item: T ): boolean;
}

export default ICollection;
