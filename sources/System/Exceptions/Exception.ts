/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import Environment from '../Runtime/Environment';
import IDictionary from '../Collections/IDictionary';
import LinkedList from '../Collections/LinkedList';
import Object from '../Object';
import String from '../Primitives/String';
import Type from '../Type';

/**
 * The base class for every exceptional error that can occur during execution.
 *
 * @extends Object
 */
export class Exception extends Object
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Creates a new Exception with an optional error message and an optional
	 * inner Exception that causes this Exception.
	 *
	 * @param message
	 * The error message for this Exception.
	 *
	 * @param innerException
	 * The inner exception as the cause of this exception.
	 */
	public constructor( message: ( string | null ) = null, innerException: ( Exception | null ) = null )
	{
		super();

		this._finalized = false;
		this._helpLink = null;
		this._innerException = innerException;
		this._message = message;

		try
		{
			throw new Error( this.message ? this.message.toString() : undefined );
		}
		catch ( error )
		{
			this._error = error;
		}
	}

	//////
	//
	//  Properties
	//
	//////

	private _data: ( IDictionary<String, Object> | undefined );
	private _error: Error;
	private _finalized: boolean;
	private _helpLink: ( string | null );
	private _innerException: ( Exception | null );
	private _message: ( string | null );
	private _source: ( string | null );

	/**
	 * Contains custom data for this exception.
	 */
	public get data(): IDictionary<String, Object>
	{
		if ( this._data === undefined )
		{
			this._data = new LinkedList<String, Object>();
		}

		return this._data;
	}

	/**
	 * A URI link to the associated help file.
	 */
	public get helpLink(): ( string | null )
	{
		return this._helpLink;
	}
	public set helpLink( value: ( string | null ) )
	{
		this._helpLink = value;
	}

	/**
	 * The cause of the current exception.
	 */
	public get innerException(): ( Exception | null )
	{
		return this._innerException;
	}

	/**
	 * The error message of this exception.
	 */
	public get message(): ( string | null )
	{
		return this._message;
	}

	/**
	 * The name of the object that causes the error.
	 */
	public get source(): ( string | null )
	{
		return this._source;
	}
	public set source( value: ( string | null ) )
	{
		this._source = value;
	}

	/**
	 * The call stack during the creation or throwing of the Exception.
	 */
	public get stackTrace(): string
	{
		return ( this._error.stack || Environment.NEWLINE + '    stack not available' ).replace( REGEXP_REMOVE_FIRST_LINE, '' );
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Finalize this exception object for immediate throw and overwrites the
	 * stack trace.
	 *
	 * @exception {Exception}
	 * This exception object.
	 */
	public finalize(): Exception
	{
		if ( this._finalized )
		{
			return this;
		}

		try
		{
			throw new Error( this._message ? this._message.toString() : undefined );
		}
		catch ( error )
		{
			this._error = error;
		}
		finally
		{
			this._finalized = true;
			return this;
		}
	}

	/**
	 * Returns the class name of the base Exception for furhter handling.
	 *
	 * @return {string}
	 * The base Exception of this Exception chain.
	 */
	public getBaseException(): Exception
	{
		let baseException = this as Exception;

		while ( baseException.innerException != null )
		{
			baseException = baseException.innerException;
		}

		return baseException;
	}

	/**
	 * Returns the type of this Exception for further reflection.
	 *
	 * @return {Type}
	 * The type of this Exception.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * Returns the a detailed string of this Exception.
	 *
	 * @param includeStackTrace
	 * Set false to exclude the stack trace.
	 *
	 * @param includeMessage
	 * Set false to exclude the error message.
	 *
	 * @return {string}
	 * The string of this exception object.
	 */
	public toString( includeStackTrace: boolean = true, includeMessage: boolean = true ): string
	{
		let str = '';

		if ( includeMessage
			&& this.message !== null )
		{
			str += this.message;
		}

		let stackTrace = this.stackTrace;

		if ( includeStackTrace
			&& stackTrace !== '' )
		{
			if ( str !== '' )
			{
				str += Environment.NEWLINE;
			}

			str += stackTrace;
		}

		if ( str === '' )
		{
			return this.getType().fullName;
		}
		else
		{
			return this.getType().fullName + ': ' + str;
		}
	}
}

export default Exception;

const REGEXP_REMOVE_FIRST_LINE = new RegExp( '^[^' + Environment.NEWLINE_ALL.join( '' ) + ']*(?:[' + Environment.NEWLINE_ALL.join( '' ) + ']+|$)' );
