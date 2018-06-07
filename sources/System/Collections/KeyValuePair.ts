/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import Object from '../Object';
import Type from '../Type';

/**
 * This class provides a structure for a key/value pair.
 * @extends Object
 */
export class KeyValuePair<TKey extends Object, TValue extends Object> extends Object
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Create a new instance with the given key/value pair.
	 * @param {Obj} key The key of the pair.
	 * @param {Obj} value The value of the pair.
	 */
	public constructor( key: TKey, value: TValue )
	{
		super();
		this._key = key;
		this._value = value;
	}

	//////
	//
	//  Properties
	//
	//////

	private _key: TKey;
	private _value: TValue;

	/**
	 * The key of this pair.
	 */
	public get key(): TKey
	{
		return this._key;
	}

	/**
	 * The value of this pair.
	 */
	public get value(): TValue
	{
		return this._value;
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Compares this pair with an other object for equality.
	 * @param {KeyValuePair|Object} other The object to compare with.
	 * @return {boolean} Returns true, if the objects are equal, otherwise false.
	 */
	public equals( other: ( KeyValuePair<TKey, TValue> | Object ) ): boolean
	{
		return (
			other instanceof KeyValuePair
			&& other._key.equals( this._key )
			&& other._value.equals( this._value )
		);
	}

	/**
	 * Returns the type of this pair for further reflection.
	 * @return {Type} Returns the type of this pair.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default KeyValuePair;
