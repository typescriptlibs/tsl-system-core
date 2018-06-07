/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../metaData';
import Boolean from '../Primitives/Boolean';
import IEnumerator from './IEnumerator';
import Object from '../Object';
import Type from '../Type';

/**
 * Provides a simple way to move through a generic array of items.
 *
 * @extends Object
 *
 * @implements IEnumerator
 */
export class Enumerator<T extends Object> extends Object implements IEnumerator<T>
{
	//////
	//
	//  Static Functions
	//
	//////

	/**
	 * Creates a Enumerator to move through a generic array of items.
	 *
	 * @param {T[]} items
	 * The array of items for the Enumerator.
	 *
	 * @return {Enumerator}
	 * The Enumerator to move through the array.
	 */
	public static of<T extends Object>( items: T[] ): Enumerator<T>
	{
		return new Enumerator<T>( items );
	}

	//////
	//
	//  Constructor
	//
	//////

	private constructor( values: T[] )
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

	private _current: ( T | undefined );
	private _values: T[];
	private _valuesLength: number;
	private _position: number;

	/**
	 * The item at the current position of the array, or undefined.
	 */
	public get current(): ( T | undefined )
	{
		return this._current;
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * The clean up function to dispose unmanaged data of the Enumerator.
	 */
	public dispose()
	{
		delete this._current;
		delete this._values;;
		delete this._valuesLength;
		delete this._position;
	}

	/**
	 * Returns the type of the Enumerator for further reflection.
	 *
	 * @return {Type}
	 * The type of this Enumerator.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * Moves to the next position in the array.
	 *
	 * @return {Boolean}
	 * Returns Boolean.TRUE, if next position was found, otherwise
	 * Boolean.FALSE.
	 */
	public moveNext(): Boolean
	{
		if ( ++this._position < this._valuesLength )
		{
			this._current = this._values[this._position];
			return Boolean.TRUE;
		}
		else
		{
			this._current = undefined;
			return Boolean.FALSE;
		}
	}

	/**
	 * Resets the position to the beginning of the array.
	 */
	public reset()
	{
		this._current = undefined;
		this._position = -1;
	}
}

export default Enumerator;
