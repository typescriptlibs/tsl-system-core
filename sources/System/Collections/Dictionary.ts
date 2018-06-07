/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

declare let Map: any;

import packageMetaData from '../../metaData';
import Object from '../Object';
import ICollection from './ICollection';
import IDictionary from './IDictionary';
import IEnumerator from './IEnumerator';
import KeyValuePair from './KeyValuePair';
import Type from '../Type';

/**
 * A generic representation of a dictionary.
 * @extends Object
 * @implements ICollection, IDictionary
 */
export class Dictionary<TKey extends Object, TValue extends Object> extends Object implements ICollection<KeyValuePair<TKey, TValue>>, IDictionary<TKey, TValue>
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Initializes a new instance of a the dictionary.
	 */
	public constructor()
	{
		super();
		this._pairs = new Map();
	}

	//////
	//
	//  Properties
	//
	//////

	private _pairs: any;

	/**
	 * The number of keys in this dictionary.
	 */
	public get count(): number
	{
		return this._pairs.size;
	}

	/**
	 * Indicates whether this dictionary is read-only.
	 */
	public get isReadOnly(): boolean
	{
		return false;
	}

	/**
	 * The keys of the pairs.
	 */
	public get keys(): ICollection<TKey>
	{
		let keys = Array<TKey>();

		this._pairs.forEach(
			( value: TValue, key: TKey, map: any ) =>
			{
				keys.push( key );
			}
		);

		return KeyCollection.of( keys );
	}

	/**
	 * The underlying dictionary with stringified keys and key value pairs.
	 */
	public get item(): { [keyString: string]: KeyValuePair<TKey, TValue> }
	{
		return this._pairs;
	}

	/**
	 * The values of the pairs.
	 */
	public get values(): ICollection<TValue>
	{
		let values = Array<TValue>();

		this._pairs.forEach(
			( value: TValue, key: TKey, map: any ) =>
			{
				values.push( value );
			}
		);

		return ValueCollection.of( values );
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Adds a new pair to the dictionary.
	 * @param {KeyValuePair} pair The new pair for the dictionary.
	 */
	public add( pair: KeyValuePair<TKey, TValue> )
	{
		this._pairs[pair.key.toString().valueOf()] = pair;
	}

	/**
	 * Removes all pairs from the dictionary.
	 */
	public clear()
	{
		global.Object
			.keys( this._pairs )
			.forEach( key => delete this._pairs[key] );
	}

	/**
	 * Tests whether a pair is part of the dictionary.
	 * @param {KeyValuePair} pair The pair to test.
	 * @return {boolean} Returns true if the pair is part of the dictionary, otherwise false.
	 */
	public contains( pair: KeyValuePair<TKey, TValue> ): boolean
	{
		return ( !!this._pairs[pair.key.toString().valueOf()] );
	}

	/**
	 * Compares this dictionary with an other dictionary for equality.
	 * @param {KeyValuePair|Obj|null} other The dictionary to compare with.
	 * @return {Boolean} Returns true, if the dictionaries are equal, otherwise false.
	 */
	public equals( other: Dictionary<TKey, TValue> ): boolean
	{
		if ( other.count != this.count )
		{
			return false;
		}

		let keys = global.Object.keys( this._pairs );

		for ( let index = 0, indexEnd = keys.length; index < indexEnd; ++index )
		{
			let key = keys[index];
			if ( !other._pairs[key]
				|| !other._pairs[key].equals( this._pairs[key] ) )
			{
				return false;
			}
		}

		return true;
	}

	/**
	 * Performs specified actions for each key value pair in the dictionary.
	 * @param {Delegate}delegate The function with specified actions for each key value pair.
	 * @param {any} thisArg Sets the this key word in each function call.
	 */
	public forEach( delegate: ( pair: KeyValuePair<TKey, TValue>, dictionary: Dictionary<TKey, TValue> ) => any, thisArg?: any )
	{
		global.Object
			.keys( this._pairs )
			.forEach( key =>
			{
				if ( this._pairs[key] )
				{
					delegate.call( thisArg, this._pairs[key], this );
				}
			} );
	}

	/**
	 * Returns an enumerator that iterates through the dictionary of key value pairs.
	 * @return {IEnumerator} Returns the enumerator for the dictionary.
	 */
	public getEnumerator(): IEnumerator<KeyValuePair<TKey, TValue>>
	{
		let pairs = new Array<KeyValuePair<TKey, TValue>>();

		global.Object
			.keys( this._pairs )
			.forEach( key => pairs.push( this._pairs[key] ) );

		return DictionaryEnumerator.of( pairs );
	}

	/**
	 * Returns the type of the dictionary for further reflection.
	 * @return {Type} Returns the type of this dictionary.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * Removes a pair from the dictionary.
	 * @param {KeyValuePair} pair The pair to remove.
	 */
	public remove( pair: KeyValuePair<TKey, TValue> )
	{
		delete this._pairs[pair.key.toString().valueOf()];
	}
}

export default Dictionary;

class DictionaryEnumerator<TKey extends Object, TValue extends Object> extends Object implements IEnumerator<KeyValuePair<TKey, TValue>>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TKey extends Object, TValue extends Object>( pairs: Array<KeyValuePair<TKey, TValue>> ): DictionaryEnumerator<TKey, TValue>
	{
		return new DictionaryEnumerator( pairs );
	}

	//////
	//
	//  Constructor
	//
	//////

	private constructor( pairs: Array<KeyValuePair<TKey, TValue>> )
	{
		super();
		this._pairs = pairs;
		this._pairsLength = pairs.length;
		this.reset();
	}

	//////
	//
	//  Properties
	//
	//////

	private _current: ( KeyValuePair<TKey, TValue> | undefined );
	private _pairs: Array<KeyValuePair<TKey, TValue>>;
	private _pairsLength: number;
	private _position: number;

	public get current(): ( KeyValuePair<TKey, TValue> | undefined )
	{
		return this._current;
	}

	//////
	//
	//  Functions
	//
	//////

	public dispose()
	{
		delete this._current;
		delete this._pairs;
		delete this._pairsLength;
		delete this._position;
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public moveNext(): boolean
	{
		if ( ++this._position < this._pairsLength )
		{
			this._current = this._pairs[this._position];
			return true;
		}
		else
		{
			this._current = undefined;
			return false;
		}
	}

	public reset()
	{
		this._current = undefined;
		this._position = -1;
	}
}

class KeyCollection<TKey extends Object> extends Object implements ICollection<TKey>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TKey extends Object>( keys: Array<TKey> ): KeyCollection<TKey>
	{
		return new KeyCollection( keys );
	}

	//////
	//
	//  Constructor
	//
	//////

	private constructor( keys: Array<TKey> )
	{
		super();
		this._keys = keys;
	}

	//////
	//
	//  Properties
	//
	//////

	private _keys: Array<TKey>;

	public get count(): number
	{
		return this._keys.length;
	}

	public get isReadOnly(): boolean
	{
		return true;
	}

	//////
	//
	//  Functions
	//
	//////

	public add( key: TKey )
	{
	}

	public clear()
	{
	}

	public contains( key: TKey ): boolean
	{
		for ( let index = 0, indexEnd = this._keys.length; index < indexEnd; ++index )
		{
			if ( key.equals( this._keys[index] ) )
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * Performs specified actions for each key in the KeyCollection.
	 * @param {Delegate}delegate The function with specified actions for each key.
	 * @param {any} thisArg Sets the this key word in each function call.
	 */
	public forEach( delegate: ( key: TKey, keyCollection: KeyCollection<TKey> ) => any, thisArg?: any )
	{
		let enumerator = this.getEnumerator();

		while ( enumerator.moveNext() )
		{
			delegate.call( thisArg, enumerator.current, this );
		}
	}

	/**
	 * Returns an enumerator that iterates through the KeyCollection.
	 * @return {IEnumerator} Returns the enumerator for the KeyCollection.
	 */
	public getEnumerator(): IEnumerator<TKey>
	{
		return KeyCollectionEnumerator.of( this._keys );
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public remove( key: TKey )
	{
	}
}

class KeyCollectionEnumerator<TKey extends Object> extends Object implements IEnumerator<TKey>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TKey extends Object>( keys: Array<TKey> ): KeyCollectionEnumerator<TKey>
	{
		return new KeyCollectionEnumerator( keys );
	}

	//////
	//
	//  Constructor
	//
	//////

	private constructor( keys: Array<TKey> )
	{
		super();
		this._keys = keys;
		this._keysLength = keys.length;
		this.reset();
	}

	//////
	//
	//  Properties
	//
	//////

	private _current: ( TKey | undefined );
	private _keys: Array<TKey>;
	private _keysLength: number;
	private _position: number;

	public get current(): ( TKey | undefined )
	{
		return this._current;
	}

	//////
	//
	//  Functions
	//
	//////

	public dispose()
	{
		delete this._current;
		delete this._keys;
		delete this._keysLength;
		delete this._position;
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public moveNext(): boolean
	{
		if ( ++this._position < this._keysLength )
		{
			this._current = this._keys[this._position];
			return true;
		}
		else
		{
			this._current = undefined;
			return false;
		}
	}

	public reset()
	{
		this._current = undefined;
		this._position = -1;
	}
}

class ValueCollection<TValue extends Object> extends Object implements ICollection<TValue>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TValue extends Object>( values: Array<TValue> ): ValueCollection<TValue>
	{
		return new ValueCollection( values );
	}

	//////
	//
	//  Constructor
	//
	//////

	private constructor( values: Array<TValue> )
	{
		super();
		this._values = values;
	}

	//////
	//
	//  Properties
	//
	//////

	private _values: Array<TValue>;

	public get count(): number
	{
		return this._values.length;
	}

	public get isReadOnly(): boolean
	{
		return true;
	}

	//////
	//
	//  Functions
	//
	//////

	public add( value: TValue )
	{
	}

	public clear()
	{
	}

	public contains( value: TValue ): boolean
	{
		for ( let index = 0, indexEnd = this._values.length; index < indexEnd; ++index )
		{
			if ( value.equals( this._values[index] ) )
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * Performs specified actions for each value in the ValueCollection.
	 * @param {Delegate}delegate The function with specified actions for each value.
	 * @param {any} thisArg Sets the this key word in each function call.
	 */
	public forEach( delegate: ( value: TValue, valueCollection: ValueCollection<TValue> ) => any, thisArg?: any )
	{
		let enumerator = this.getEnumerator();

		while ( enumerator.moveNext() )
		{
			delegate.call( thisArg, enumerator.current, this );
		}
	}

	/**
	 * Returns an enumerator that iterates through the ValueCollection.
	 * @return {IEnumerator} Returns the enumerator for the ValueCollection.
	 */
	public getEnumerator(): IEnumerator<TValue>
	{
		return ValueCollectionEnumerator.of( this._values );
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public remove( value: TValue )
	{
	}
}

class ValueCollectionEnumerator<TValue extends Object> extends Object implements IEnumerator<TValue>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TValue extends Object>( keys: Array<TValue> ): ValueCollectionEnumerator<TValue>
	{
		return new ValueCollectionEnumerator( keys );
	}

	//////
	//
	//  Constructor
	//
	//////

	private constructor( values: Array<TValue> )
	{
		super();
		this._values = values;
		this._valuesLength = values.length;
		this.reset();
	}

	//////
	//
	//  Properties
	//
	//////

	private _current: ( TValue | undefined );
	private _values: Array<TValue>;
	private _valuesLength: number;
	private _position: number;

	public get current(): ( TValue | undefined )
	{
		return this._current;
	}

	//////
	//
	//  Functions
	//
	//////

	public dispose()
	{
		delete this._current;
		delete this._values;;
		delete this._valuesLength;
		delete this._position;
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public moveNext(): boolean
	{
		if ( ++this._position < this._valuesLength )
		{
			this._current = this._values[this._position];
			return true;
		}
		else
		{
			this._current = undefined;
			return false;
		}
	}

	public reset()
	{
		this._current = undefined;
		this._position = -1;
	}
}