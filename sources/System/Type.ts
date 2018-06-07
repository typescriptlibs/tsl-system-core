/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

declare function require( path: string ): any;

import IPackageMetaData from './Runtime/IPackageMetaData';
import Object from './Object';
import RuntimeUtility from './Runtime/RuntimeUtility';

/**
 * The type class of an object provides information for further reflection.
 *
 * @extends Object
 */
export class Type extends Object
{
	//////
	//
	//  Static Functions
	//
	//////

	/**
	 * Loads a class and returns its type.
	 *
	 * @param {string} name
	 * The name of the class.
	 *
	 * @param {string} packageName
	 * The name of the package.
	 *
	 * @returns {Type|undefind}
	 * The type of the class.
	 */
	public static of( name: string, packageName?: string ): ( Type | undefined )
	{
		let imported_module: any = require( packageName || 'tsl-system-core' );

		if ( imported_module )
		{
			return new Type( ( { 'constructor': imported_module[name] } as any ), imported_module );
		}
		else
		{
			return undefined;
		}
	}

	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Creates the class type of a given object.
	 *
	 * @param {Object} object
	 * An instance object of the class.
	 *
	 * @param {IPackageMetaData} IPackageMetaData
	 * The meta data of the object package.
	 */
	public constructor( object: Object, packageMetaData: IPackageMetaData )
	{
		super();

		this._constructor = object.constructor;
		this._packageMetaData = packageMetaData;
		this._name = ( this._constructor.name == '_Object_' ? 'Object' : this._constructor.name );
		this._numberOfArguments = object.constructor.length;
	}

	//////
	//
	//  Properties
	//
	//////

	private _constructor: any;
	private _hashCode: ( number | undefined );
	private _name: string;
	private _numberOfArguments: number;
	private _packageMetaData: IPackageMetaData;

	/**
	 * The constructor of the class.
	 */
	public get classConstructor(): Function
	{
		return this._constructor;
	}

	/**
	 * The full class name.
	 */
	public get fullName(): string
	{
		return ( this.packageName + '.' + this.name );
	}

	/**
	 * The class name.
	 */
	public get name(): String
	{
		return this._name;
	}

	/**
	 * The name of the package of this class.
	 */
	public get packageName(): String
	{
		return this._packageMetaData.name;
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Compares this object type with another object type.
	 *
	 * @param {Type|Object} other
	 * The other object or type to compare with.
	 *
	 * @returns {boolean}
	 * Returns true, if the objects are equal, otherwise false.
	 */
	public equals( other: ( Type | Object ) ): boolean
	{
		return (
			other instanceof Type
			&& other.fullName === this.fullName
		);
	}

	/**
	 * Generates a unique code for this type.
	 *
	 * @return {number}
	 * Returns the unique code for this type.
	 */
	public getHashCode(): number
	{
		if ( this._hashCode === undefined )
		{
			this._hashCode = RuntimeUtility.generateStringHashCode( this.fullName.valueOf() );
		}

		return this._hashCode;
	}

	/**
	 * Returns itself for further reflection.
	 *
	 * @returns {Type}
	 * Returns this type.
	 */
	public getType(): Type
	{
		return this;
	}

	/**
	 * Returns the full name of the representing class.
	 *
	 * @return {string}
	 * Returns the full class name.
	 */
	public toString(): string
	{
		return this.fullName;
	}

	/**
	 * Returns the full name of the representing class.
	 *
	 * @return {string}
	 * Returns the full class name.
	 */
	public valueOf(): string
	{
		return this.fullName;
	}
}

export default Type;
