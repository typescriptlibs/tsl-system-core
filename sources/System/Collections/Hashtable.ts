/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../metaData';
import ArgumentNullException from '../Exceptions/ArgumentNullException';
import ArgumentOutOfRangeException from '../Exceptions/ArgumentOutOfRangeException';
import Boolean from '../Primitives/Boolean';
import Collection from './Collection';
import Enumerator from './Enumerator';
import Environment from '../Runtime/Environment';
import IDictionary from './IDictionary';
import IEqualityComparer from './IEqualityComparer';
import IKeyValuePairDictionary from './IKeyValuePairDictionary';
import Int32 from '../Primitives/Int32';
import KeyValuePair from './KeyValuePair';
import NotSupportedException from '../Exceptions/NotSupportedException';
import Object from '../Object';
import Type from '../Type';

/**
 * A generic representation of a hashtable.
 *
 * @extends Object
 *
 * @implements IDictionary
 */
export class Hashtable<TKey extends Object, TValue extends Object>
	extends Object
	implements IDictionary<TKey, TValue>
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Initializes a new hashtable by moving the items from the specified
	 * dictionary to the new Hashtable object.
	 *
	 * @param {IDictionary} dictionary
	 * The specified dictionary with the initial items. (optional)
	 */
	public constructor( dictionary?: IDictionary<TKey, TValue>, equalityComparer?: IEqualityComparer )
	{
		super();

		this._keyValuePairs = {};
	}

	//////
	//
	//  Properties
	//
	//////

	private _keyValuePairs: IKeyValuePairDictionary<TKey, TValue>;

	/**
	 * The number of KeyValuePair in this Hashtable.
	 */
	public get count(): Int32
	{
		return new Int32( Environment.ESOBJECT.keys( this._keyValuePairs ).length );
	}

	/**
	 * Indicates whether this Hashtable is read-only.
	 */
	public get isReadOnly(): Boolean
	{
		return Boolean.FALSE;
	}

	/**
	 * Gets or sets the KeyValuePair associated with the specified hash code.
	 */
	public get item(): IKeyValuePairDictionary<TKey, TValue>
	{
		return this._keyValuePairs;
	}

	/**
	 * A HashtableKeyCollection of every key in the Hashtable.
	 */
	public get keys(): HashtableKeyCollection<TKey>
	{
		let values = [] as TKey[];

		Environment.ESOBJECT
			.keys( this._keyValuePairs )
			.forEach( hashString => values.push( this._keyValuePairs[hashString].key ) );

		return HashtableKeyCollection.of( values );
	}

	/**
	 * A HashtableValueCollection of every value in the Hashtable.
	 */
	public get values(): HashtableValueCollection<TValue>
	{
		let values = [] as TValue[];

		Environment.ESOBJECT
			.keys( this._keyValuePairs )
			.forEach( hashString => values.push( this._keyValuePairs[hashString].value ) );

		return HashtableValueCollection.of( values );
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Adds an item with the specified key and value or a specified
	 * KeyValuePair to the IDictionary.
	 *
	 * @param {TKey|KeyValuePair} keyOrKeyValuePair
	 * The object to use as the key or the KeyValuePair to add.
	 *
	 * @param {TValue} value
	 * The object to use as the value of a KeyValuePair to add.
	 */
	public add( keyOrKeyValuePair: ( TKey | KeyValuePair<TKey, TValue> ), value?: TValue ): void
	{
		if ( keyOrKeyValuePair instanceof KeyValuePair )
		{
			this._keyValuePairs[keyOrKeyValuePair.key.getHashCode().toString()] = keyOrKeyValuePair;
		}
		else if ( value instanceof Object )
		{
			this._keyValuePairs[keyOrKeyValuePair.getHashCode().toString()] = new KeyValuePair( keyOrKeyValuePair, value );
		}
	}

	/**
	 * Removes all KeyValuePair from the Hashtable.
	 */
	public clear(): void
	{
		Environment.ESOBJECT
			.keys( this._keyValuePairs )
			.forEach( hashCode => delete this._keyValuePairs[hashCode] );
	}

	/**
	 * Tests whether a KeyValuePair is part of the Hashtable.
	 *
	 * @param keyValuePair
	 * The KeyValuePair to locate in the Hashtable.
	 */
	public contains( keyValuePair: KeyValuePair<TKey, TValue> ): Boolean
	{
		let hashCode = keyValuePair.key.getHashCode().toString();

		if ( typeof this._keyValuePairs[hashCode] == 'undefined'
			|| !this._keyValuePairs[hashCode].equals( keyValuePair ) )
		{
			return Boolean.FALSE;
		}
		else
		{
			return Boolean.TRUE;
		}
	}

	/**
	 * Tests whether an item with the specified key is part of the IDictionary.
	 *
	 * @param {TKey} key
	 * The key to locate in the IDictionary.
	 *
	 * @return {Boolean}
	 * Returns Boolean.TRUE if the IDictionary contains an KeyValuePair with
	 * the key, otherwise Boolean.FALSE.
	 */
	public containsKey( key: TKey ): Boolean
	{
		let hashCode = key.getHashCode().toString();

		if ( typeof this._keyValuePairs[hashCode] == 'undefined' )
		{
			return Boolean.FALSE;
		}
		else
		{
			return Boolean.TRUE;
		}
	}

	/**
	 * Copies items of the ICollection to a specified array, starting at a
	 * specified index of the array.
	 *
	 * @param {T[]} array
	 * The array as destination of the items, that are copied from ICollection.
	 *
	 * @param {Int32} arrayIndex
	 * The zero-based index of the array, at which to start with inserting the
	 * copied items.
	 *
	 * @throws {ArgumentNullException}
	 * The array is null.
	 *
	 * @throws {ArgumentOutOfRangeException}
	 * The array index is less than zero.
	 */
	public copyTo( array: KeyValuePair<TKey, TValue>[], arrayIndex: Int32 ): void
	{
		if ( array === null )
		{
			throw new ArgumentNullException( 'The array is null.' );
		}

		if ( arrayIndex.valueOf() < 0 )
		{
			throw new ArgumentOutOfRangeException( 'The array index is less than zero.' );
		}

		let index = 0;
		let startIndex = arrayIndex.valueOf();

		this.forEach( keyValuePair => array[startIndex + ( index++ )] = keyValuePair );
	}

	/**
	 * Performs specified actions for each KeyValuePair in this Hashtable.
	 *
	 * @param {Delegate} delegate
	 * The function with specified actions for each KeyValuePair.
	 *
	 * @param {any} thisArg
	 * Sets the this-keyword in each function call.
	 */
	public forEach( delegate: ( keyValuePair: KeyValuePair<TKey, TValue>, hashtable: Hashtable<TKey, TValue> ) => any, thisArg?: any ): void
	{
		Environment.ESOBJECT
			.keys( this._keyValuePairs )
			.forEach( key => delegate.call( thisArg, this._keyValuePairs[key], this ) );
	}

	/**
	 * Returns a Enumerator that moves through the Hashtable.
	 *
	 * @return {Enumerator}
	 * Returns the enumerator for the Hashtable.
	 */
	public getEnumerator(): Enumerator<KeyValuePair<TKey, TValue>>
	{
		let keyValuePairs = [] as KeyValuePair<TKey, TValue>[];

		global.Object
			.keys( this._keyValuePairs )
			.forEach( key => keyValuePairs.push( this._keyValuePairs[key] ) );

		return Enumerator.of( keyValuePairs );
	}

	/**
	 * Returns the type of this Hashtable for further reflection.
	 *
	 * @return {Type}
	 * The type of this Hashtable.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * Removes a KeyValuePair from the Hashtable.
	 *
	 * @param {TKey|KeyValuePair} keyOrKeyValuePair
	 * The KeyValuePair to remove from the Hashtable.
	 *
	 * @return {Boolean}
	 * Returns Boolean.TRUE if the KeyValuePair was found and successfully
	 * removed, otherwise Boolean.FALSE.
	 */
	public remove( keyOrKeyValuePair: ( TKey | KeyValuePair<TKey, TValue> ) ): Boolean
	{
		if ( keyOrKeyValuePair instanceof KeyValuePair )
		{
			let hashCode = keyOrKeyValuePair.key.getHashCode().toString();

			if ( typeof this._keyValuePairs[hashCode] != 'undefined'
				&& this._keyValuePairs[hashCode].equals( keyOrKeyValuePair ) )
			{
				delete this._keyValuePairs[hashCode];
				return Boolean.TRUE;
			}
		}
		else
		{
			let hashCode = keyOrKeyValuePair.getHashCode().toString();

			if ( typeof this._keyValuePairs[hashCode] != 'undefined' )
			{
				delete this._keyValuePairs[hashCode];
				return Boolean.TRUE;
			}
		}

		return Boolean.FALSE;
	}

	/**
	 * Gets the value of an KeyValuerPair with the specified key.
	 *
	 * @param {TKey} key
	 * The key of the item, whose value is wanted.
	 *
	 * @param {(TValue|undefined)=>any} outValue
	 * When Boolean.TRUE is returned, the value of the item has been returned,
	 * otherwise Boolean.FALSE indicates a return of undefined.
	 */
	tryGetValue( key: TKey, outValue: ( value: ( TValue | undefined ) ) => any ): Boolean
	{
		let hashString = key.getHashCode().toString();
		let success = Boolean.FALSE;

		try
		{
			if ( typeof this._keyValuePairs[hashString] !== 'undefined' )
			{
				success = Boolean.TRUE;
				outValue( this._keyValuePairs[hashString].value );
			}
		}
		catch ( error )
		{
			success = Boolean.FALSE;

			throw error;
		}
		finally
		{
			return success;
		}
	}
}

export default Hashtable;

class HashtableKeyCollection<T extends Object> extends Collection<T>
{
	//////
	//
	//  Static Functions
	//
	//////

	/**
	 * Creates a HashtableKeyCollection of keys.
	 *
	 * @param {T[]} keys
	 * The array of keys for the HashtableKeyCollection.
	 *
	 * @return {HashtableKeyCollection}
	 * The HashtableKeyCollection of the array.
	 */
	public static of<T extends Object>( keys: T[] ): HashtableKeyCollection<T>
	{
		return new HashtableKeyCollection<T>( keys );
	}

	//////
	//
	//  Properties
	//
	//////

	/**
	 * The HashtableKeyCollection is read-only.
	 */
	public get isReadOnly(): Boolean
	{
		return Boolean.TRUE;
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of the HashtableKeyCollection for further reflection.
	 *
	 * @return {Type}
	 * The type of this HashtableKeyCollection.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

class HashtableValueCollection<T extends Object> extends Collection<T>
{
	//////
	//
	//  Static Functions
	//
	//////

	/**
	 * Creates a HashtableValueCollection of values.
	 *
	 * @param {T[]} values
	 * The array of values for the HashtableValueCollection.
	 *
	 * @return {HashtableValueCollection}
	 * The HashtableValueCollection of the array.
	 */
	public static of<T extends Object>( values: T[] ): HashtableValueCollection<T>
	{
		return new HashtableValueCollection<T>( values );
	}

	//////
	//
	//  Properties
	//
	//////

	/**
	 * The HashtableValueCollection is read-only.
	 */
	public get isReadOnly(): Boolean
	{
		return Boolean.TRUE;
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of the HashtableValueCollection for further reflection.
	 *
	 * @return {Type}
	 * The type of this HashtableValueCollection.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}
