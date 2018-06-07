/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import ArgumentException from './ArgumentException';
import Environment from '../Runtime/Environment';
import Exception from './Exception';
import Object from '../Object';
import Type from '../Type';

/**
 * The ArgumentOutOfRangeException will be thrown, when an invalid value for an
 * argument has been provided to the function.
 *
 * @extends ArgumentException
 */
export class ArgumentOutOfRangeException extends ArgumentException
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Creates a ArgumentOutOfRangeException object with an optional parameter
	 * name, an optional actual, an optional error message, and an optional
	 * inner Exception object that causes this ArgumentOutOfRangeException.
	 *
	 * @param paramName
	 * The name of the parameter, that caused the ArgumentOutOfRangeException.
	 *
	 * @param actualValue
	 * The actual value of the parameter, that caused the
	 * ArgumentOutOfRangeException.
	 *
	 * @param message
	 * The error message for this ArgumentOutOfRangeException.
	 *
	 * @param innerException
	 * The inner Exception as the cause of this ArgumentOutOfRangeException.
	 */
	public constructor( paramName?: string, actualValue?: ( Object | boolean | number | string | null ), message?: string, innerException?: Exception )
	{
		super( message, paramName, innerException );

		this._actualValue = ( actualValue || null );
	}

	//////
	//
	//  Properties
	//
	//////

	private _actualValue: ( Object | boolean | number | string | null );

	/**
	 * The error message of this ArgumentOutOfRangeException.
	 */
	public get message(): ( string | null )
	{
		if ( this.actualValue === null )
		{
			return super.message;
		}
		else
		{
			return super.message + Environment.NEWLINE + 'The actual value is \'' + this.actualValue + '\' .';
		}
	}

	/**
	 * The value of the parameter, that caused this ArgumentOutOfRangeException.
	 */
	public get actualValue(): ( Object | boolean | number | string | null )
	{
		return this._actualValue;
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of this ArgumentOutOfRangeException for further reflection.
	 *
	 * @return {Type}
	 * The type of this ArgumentOutOfRangeException.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default ArgumentOutOfRangeException;
