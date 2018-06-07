/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import EventArgs from './EventArgs';
import IEventHandler from './IEventHandler';
import Object from '../Object';
import RuntimeUtility from '../Runtime/RuntimeUtility';
import Type from '../Type';

/**
 * This is the classic event system and is used by some core classes.
 *
 * @extends Object
 */
export class Event<TEventArgs extends EventArgs = EventArgs> extends Object
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Initializes a new event system.
	 */
	public constructor()
	{
		super();
		this._eventHandlers = {};
	}

	//////
	//
	//  Properties
	//
	//////

	private _eventHandlers: { [key: string]: IEventHandler<TEventArgs> };

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Adds an event handler to the event system and returns the handler with
	 * his associated unique ID.
	 *
	 * @param {IEventHandler} eventHandler
	 * The event handler to add.
	 *
	 * @returns {IEventHandler}
	 * The EventHandler with his unique ID.
	 */
	public add( eventHandler: IEventHandler<TEventArgs> ): IEventHandler<TEventArgs>
	{
		if ( !eventHandler.uniqueID )
		{
			eventHandler.uniqueID = RuntimeUtility.generateUniqueHashCode();
		}

		this._eventHandlers[eventHandler.uniqueID.toString( 16 )] = eventHandler;

		return eventHandler;
	}

	/**
	 * Returns the type of the event system for further reflection.
	 *
	 * @return {Type}
	 * The type of this event system.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * Raises the event and calls all registered event handlers with the given
	 * arguments.
	 *
	 * @param {Object} sender
	 * The sender of the event.
	 *
	 * @param {TEventArgs} e
	 * The arguments of the event.
	 */
	public raise( sender: Object, e: TEventArgs )
	{
		global.Object.keys( this._eventHandlers ).forEach(
			( key: string ) =>
			{
				global.setTimeout( () => this._eventHandlers[key]( sender, e ), 1 );
			}
		);
	}

	/**
	 * Removes an event handler from the event system.
	 *
	 * @param {IEventHandler} eventHandler
	 * The event handler to remove.
	 */
	public remove( eventHandler: IEventHandler<TEventArgs> )
	{
		if ( eventHandler.uniqueID )
		{
			delete this._eventHandlers[eventHandler.uniqueID.toString( 16 )];
		}
	}
}

export default Event;
