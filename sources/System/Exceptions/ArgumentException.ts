/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import Environment from '../Runtime/Environment';
import Exception from './Exception';
import SystemException from './SystemException';
import Type from '../Type';

/**
 * The ArgumentException will be thrown, when an invalid argument has been
 * provided to the function.
 *
 * @extends SystemException
 */
export class ArgumentException extends SystemException
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Creates a new ArgumentException object with an optional parameter name,
	 * an optional error message, and an optional inner Exception object that
	 * causes this ArgumentException.
	 *
	 * @param paramName
	 * The name of the parameter, that caused the ArgumentException.
	 *
	 * @param message
	 * The error message for this ArgumentException.
	 *
	 * @param innerException
	 * The inner Exception as the cause of this ArgumentException.
	 */
	public constructor( paramName?: ( string | null ), message?: ( string | null ), innerException?: ( Exception | null ) )
	{
		super( message, innerException );

		this._paramName = ( paramName || null );
	}

	//////
	//
	//  Properties
	//
	//////

	private _paramName: ( string | null );

	/**
	 * The error message of this ArgumentException.
	 */
	public get message(): ( string | null )
	{
		if ( this.paramName === null )
		{
			return super.message;
		}
		else
		{
			return super.message + Environment.NEWLINE + 'The value for \'' + this.paramName + '\' is invalid.';
		}
	}

	/**
	 * The name of the parameter, that caused this ArgumentException.
	 */
	public get paramName(): ( string | null )
	{
		return this._paramName;
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of this ArgumentException for further reflection.
	 *
	 * @return {Type}
	 * The type of this ArgumentException.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default ArgumentException;
