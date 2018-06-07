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
 * A base class for event arguments.
 * @extends Object
 */
export class EventArgs extends Object
{
	//////
	//
	//  Constructors
	//
	//////

	/**
	 * Initializes a new object of the EventArgs class.
	 */
	public constructor()
	{
		super();
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of the event arguments for further reflection.
	 * @return {Type} The type of this event arguments.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default EventArgs;
