/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import ArgumentNullException from '../Exceptions/ArgumentNullException';
import ArgumentOutOfRangeException from '../Exceptions/ArgumentOutOfRangeException';
import Boolean from '../Primitives/Boolean';
import Enumerator from './Enumerator';
import ICollection from './ICollection';
import IEnumerator from './Enumerator';
import Int32 from '../Primitives/Int32';
import NotSupportedException from '../Exceptions/NotSupportedException';
import Object from '../Object';
import Type from '../Type';

/**
 * Represents a generic Collection of items.
 */
export class Collection<T extends Object>
	extends Object
	implements ICollection<T>
{
	//////
	//
	//  Static Functions
	//
	//////

	/**
	 * Creates a generic Collection of items.
	 *
	 * @param {T[]} items
	 * The array of items for the Collection.
	 *
	 * @return {Collection}
	 * The generic Collection of the array.
	 */
	public static of<T extends Object>( items: T[] ): Collection<T>
	{
		return new Collection<T>( items );
	}

	//////
	//
	//  Constructor
	//
	//////

	protected constructor( items: T[] )
	{
		super();

		this._items = items;
	}

	//////
	//
	//  Properties
	//
	//////

	private _items: T[];

	/**
	 * The number of items in this collection.
	 */
	public get count(): number
	{
		return this._items.length;
	}

	/**
	 * Indicates whether this collection is read-only.
	 */
	public get isReadOnly(): boolean
	{
		return false;
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Adds a new item to the Collection.
	 *
	 * @param {T} item
	 * The item to add to the Collection.
	 *
	 * @exception {NotSupportedException}
	 * The Collection is read-only.
	 */
	public add( item: T )
	{
		if ( this.isReadOnly === true )
		{
			throw new NotSupportedException( 'The collection is read-only.' );
		}

		this._items.push( item );
	}

	/**
	 * Removes all items from the Collection.
	 *
	 * @exception {NotSupportedException}
	 * The Collection is read-only.
	 */
	public clear()
	{
		if ( this.isReadOnly === true )
		{
			throw new NotSupportedException( 'The collection is read-only.' );
		}

		this._items.length = 0;
	}

	/**
	 * Tests whether an item is part of the Collection.
	 *
	 * @param {T} item
	 * The item to locate in the Collection.
	 *
	 * @return {boolean}
	 * Returns true if the item has been found in the Collection, otherwise
	 * returns false.
	 */
	public contains( value: T ): boolean
	{
		return this._items.some( item => { return item.equals( value ); } );
	}

	/**
	 * Copies items of the ICollection to a specified Array, starting at a
	 * specified index of the Array.
	 *
	 * @param {T[]} array
	 * The Array as destination of the items, that are copied from ICollection.
	 *
	 * @param {number} arrayIndex
	 * The zero-based index of the Array, at which to start with inserting the
	 * copied items.
	 *
	 * @exception {ArgumentNullException}
	 * The array is null.
	 *
	 * @exception {ArgumentOutOfRangeException}
	 * The array index is less than zero.
	 *
	 * @exception {ArgumentException}
	 * The number of items in the Collection ist larger than the available
	 * space in the array.
	 */
	public copyTo( array: T[], arrayIndex: number ): void
	{
		if ( array === null )
		{
			throw new ArgumentNullException( 'The array is null.' );
		}

		if ( arrayIndex < 0 )
		{
			throw new ArgumentOutOfRangeException(
				'The array index is less than zero.'
			);
		}

		this._items.forEach( ( item, index ) => array[arrayIndex + index] = item );
	}

	/**
	 * Performs specified actions for each value in the Collection.
	 *
	 * @param {Delegate} delegate
	 * The function with specified actions for each value.
	 *
	 * @param {any} thisArg
	 * Sets the this key word in each function call.
	 *
	 * @param {}
	 */
	public forEach<TReturn>( delegate: ( value: T, valueCollection: Collection<T> ) => ( TReturn | void ), thisArg?: any ): ( TReturn | undefined )
	{
		let enumerator = this.getEnumerator();
		let result = undefined;

		while ( enumerator.moveNext() === true
			&& result !== undefined )
		{
			result = delegate.call( thisArg, enumerator.current, this );
		}

		return ( result || undefined );
	}

	/**
	 * Returns an enumerator that iterates through the Collection.
	 *
	 * @return {IEnumerator}
	 * Returns the enumerator for the Collection.
	 */
	public getEnumerator(): IEnumerator<T>
	{
		return Enumerator.of<T>( this._items );
	}

	/**
	 * Returns the type of the Collection for further reflection.
	 *
	 * @return {Type}
	 * The type of this Collection.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * Removes an item from the Collection.
	 *
	 * @param {T} item
	 * The item to remove from the Collection.
	 *
	 * @return {boolean}
	 * Returns true if the item was found and successfully removed from the
	 * Collection, otherwise false.
	 *
	 * @exception {NotSupportedException}
	 * The Collection is read-only.
	 */
	public remove( value: T ): boolean
	{
		if ( this.isReadOnly === true )
		{
			throw new NotSupportedException( 'The collection is read-only.' );
		}

		let deleteIndex = -1;

		this._items
			.some( ( item, index ) =>
			{
				if ( item.equals( value ) )
				{
					deleteIndex = index;
					return true;
				}
				else
				{
					return false;
				}
			} );

		if ( deleteIndex < 0 )
		{
			return false;
		}
		else
		{
			this._items.splice( deleteIndex, 1 );

			return true;
		}
	}
}

export default Collection;
