/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../metaData';
import Object from '../Object';
import String from '../Primitives/String';
import SystemException from '../Exceptions/SystemException';
import Type from '../Type';

/**
 * This exception will be thrown, when a security error occured.
 * @extends SystemException
 */
export class SecurityException extends SystemException
{
	//////
	//
	//  Constructor
	//
	//////

	public constructor( message?: ( string | String ), permissionType?: typeof Object, permissionState?: ( string | String ) )
	{
		super( message );

		this.permissionType = ( permissionType || null );
		this.permissionState = new String( permissionState );
	}

	//////
	//
	//  Properties
	//
	//////

	private _permissionState: String;
	private _permissionType: ( typeof Object | null );

	public get permissionState(): String
	{
		return this._permissionState;
	}

	public set permissionState( value: String )
	{
		this._permissionState = value;
	}

	public get permissionType(): ( typeof Object | null )
	{
		return this._permissionType;
	}

	public set permissionType( value: ( typeof Object | null ) )
	{
		this._permissionType = value;
	}

	//////
	//
	//  Functions
	//
	//////

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public toString(): string
	{
		return super.toString();
	}
}

export default SecurityException;
