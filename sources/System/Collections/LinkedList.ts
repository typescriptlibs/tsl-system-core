/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import ArgumentException from '../Exceptions/ArgumentException';
import ArgumentNullException from '../Exceptions/ArgumentNullException';
import ArgumentOutOfRangeException from '../Exceptions/ArgumentOutOfRangeException';
import ICollection from './ICollection';
import IDictionary from './IDictionary';
import IDictionaryEnumerator from './IDictionaryEnumerator';
import IDisposable from '../IDisposable';
import IEnumerable from './IEnumerable';
import IEnumerator from './IEnumerator';
import InvalidOperationException from '../Exceptions/InvalidOperationException';
import KeyNotFoundException from '../Exceptions/KeyNotFoundException';
import KeyValuePair from './KeyValuePair';
import NotSupportedException from '../Exceptions/NotSupportedException';
import Object from '../Object';
import Type from '../Type';

/**
 * This class provides as simple dictionary list for small numbers of items and
 * dictionary operations.
 *
 * @extends Object
 *
 * @implements IDictionary
 */
export class LinkedList<TKey extends Object, TValue extends Object> extends Object implements IDictionary<TKey, TValue>
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Initialize a new LinkedList.
	 */
	public constructor()
	{
		super();

		this._count = 0;
		this._endNode = null;
		this._startNode = null;
		this._version = new LinkedVersion();
	}

	//////
	//
	//  Properties
	//
	//////

	private _count: number;
	private _endNode: ( LinkedNode<TKey, TValue> | null );
	private _startNode: ( LinkedNode<TKey, TValue> | null );
	private _version: LinkedVersion;

	/**
	 * The number of items in the LinkedList.
	 */
	public get count(): number
	{
		return this._count;
	}

	/**
	 * Indicates whether this LinkedList is read-only.
	 */
	public get isReadOnly(): boolean
	{
		return false;
	}

	/**
	 * A collection of every key in the LinkedList.
	 */
	public get keys(): ICollection<TKey>
	{
		return LinkedKeyCollection.of( this._startNode, this._count, this._version );
	}

	/**
	 * A collection of every value in the LinkedList.
	 */
	public get values(): ICollection<TValue>
	{
		return LinkedValueCollection.of( this._startNode, this._count, this._version );
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Adds a new item to the LinkedList.
	 *
	 * @param {KeyValuePair} item
	 * The item to add to the LinkedList.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 *
	 * @exception {ArgumentException}
	 * An item with the same key already exists in the LinkedList.
	 *
	 * @exception {NotSupportedException}
	 * The LinkedList is read-only.
	 */
	public add( item: KeyValuePair<TKey, TValue> )
	{
		this.addItem( item.key, item.value );
	}

	/**
	 * Adds a specified item to the LinkedList.
	 *
	 * @param {TKey} key
	 * The key of the item to add to the LinkedList.
	 *
	 * @param {TValue} value
	 * The value of the item to add to the LinkedList.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 *
	 * @exception {ArgumentException}
	 * An item with the same key already exists in the LinkedList.
	 *
	 * @exception {NotSupportedException}
	 * The LinkedList is read-only.
	 */
	public addItem( key: TKey, value: TValue )
	{
		if ( key === undefined
			|| key === null )
		{
			throw new ArgumentNullException();
		}

		if ( this.containsKey( key ) )
		{
			throw new ArgumentException();
		}

		this._version.counter++;

		let newNode = new LinkedNode( key, value );

		if ( this._startNode === null
			|| this._endNode === null )
		{
			this._startNode = newNode;
			this._endNode = newNode;
		}
		else
		{
			this._endNode.nextNode = newNode;
			newNode.previousNode = this._endNode;
			this._endNode = newNode;
		}

		this._count++;
	}

	/**
	 * Removes all items from the ICollection.
	 *
	 * @exception {NotSupportedException}
	 * The ICollection is read-only.
	 */
	public clear()
	{
		this._version.counter++;

		let nextNode = this._startNode;

		while ( nextNode !== null )
		{
			let clearNode = nextNode;

			nextNode = nextNode.nextNode;

			clearNode.dispose();
		}

		this._startNode = null;
		this._endNode = null;

		this._count = 0;
	}

	/**
	 * Tests whether an item is part of the LinkedList.
	 *
	 * @param {KeyValuePair} item
	 * The item to locate in the LinkedList.
	 *
	 * @return {boolean}
	 * Returns true if the item has been found in the LinkedList, otherwise
	 * returns false.
	 */
	public contains( item: KeyValuePair<TKey, TValue> ): boolean
	{
		return this.containsKey( item.key );
	}

	/**
	 * Tests whether an item with the specified key is part of the LinkedList.
	 *
	 * @param {TKey} key
	 * The key to locate in the LinkedList.
	 *
	 * @return {boolean}
	 * Returns true if the LinkedList contains an item with the key, otherwise
	 * false.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 */
	public containsKey( key: TKey ): boolean
	{
		if ( key === undefined
			|| key === null )
		{
			throw new ArgumentNullException();
		}

		return ( this.node( key ) !== null );
	}

	/**
	 * Copies items of the ICollection to a specified array, starting at a
	 * specified index of the array.
	 *
	 * @param {KeyValuePair[]} array
	 * The array as destination of the items, that are copied from ICollection.
	 *
	 * @param {number} arrayIndex
	 * The zero-based index of the array, at which to start with inserting the
	 * copied items.
	 *
	 * @exception {ArgumentNullException}
	 * The array is null.
	 *
	 * @exception {ArgumentOutOfRangeException}
	 * The array index is less than zero.
	 *
	 * @exception {ArgumentException}
	 * The number of items in the ICollection is greater than the available
	 * space from arrayIndex to the end of the array.
	 */
	public copyTo( array: KeyValuePair<TKey, TValue>[], arrayIndex: number )
	{
		if ( arrayIndex < 0 )
		{
			throw new ArgumentOutOfRangeException();
		}

		if ( array.length - arrayIndex < this.count )
		{
			throw new ArgumentException();
		}

		let currentNode = this._startNode;

		while ( currentNode !== null )
		{
			array[arrayIndex] = new KeyValuePair( currentNode.key, currentNode.value );
			currentNode = currentNode.nextNode;
		}
	}

	/**
	 * Performs specified actions for each item in the LinkedList.
	 *
	 * @param {Delegate} delegate
	 * The function with specified actions for each item.
	 *
	 * @param {any} thisArg
	 * Sets the this-keyword in each function call.
	 */
	public forEach<TReturn>( delegate: ( item: KeyValuePair<TKey, TValue>, enumerable: LinkedList<TKey, TValue> ) => ( TReturn | void ), thisArg?: any ): ( TReturn | undefined )
	{
		let callReturn = undefined as ( TReturn | undefined );
		let currentNode = this._startNode;

		while ( currentNode !== null )
		{
			callReturn = delegate.call( thisArg, new KeyValuePair( currentNode.key, currentNode.value ), this );

			if ( callReturn !== undefined )
			{
				break;
			}

			currentNode = currentNode.nextNode;
		}

		return callReturn;
	}

	/**
	 * Returns an enumerator that moves through the LinkedList.
	 *
	 * @return {IDictionaryEnumerator}
	 * Returns the enumerator for the LinkedList.
	 */
	public getEnumerator(): IDictionaryEnumerator<TKey, TValue>
	{
		return LinkedListEnumerator.of( this._startNode, this._version );
	}

	/**
	 * Gets an item value in the LinkedList.
	 *
	 * @param {TKey} key
	 * The key of the item to get.
	 *
	 * @return {TValue}
	 * Returns the value of the item.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 *
	 * @exception {KeyNotFoundException}
	 * The key is not part of the LinkedList.
	 */
	public item( key: TKey ): TValue
	{
		if ( key === undefined
			|| key === null )
		{
			throw new ArgumentNullException( 'key' );
		}

		let foundNode = this.node( key );

		if ( foundNode === null )
		{
			throw new KeyNotFoundException();
		}

		return foundNode.value;
	}

	/**
	 * Returns the type of this object for further reflection.
	 *
	 * @return {Type}
	 * The type of this object.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * @ignore
	 * Gets an item node in the LinkedList.
	 *
	 * @param key
	 * The key of the item to get.
	 *
	 * @return {LinkedNode<TKey, TValue> | null}
	 * Returns the node of the item.
	 */
	private node( key: TKey ): ( LinkedNode<TKey, TValue> | null )
	{
		let currentStartNode = this._startNode as ( LinkedNode<TKey, TValue> | null );
		let currentEndNode = this._endNode as ( LinkedNode<TKey, TValue> | null );

		while ( currentStartNode !== null
			&& currentEndNode !== null )
		{
			if ( currentStartNode.key.equals( key ) )
			{
				return currentStartNode;
			}

			if ( currentEndNode.key.equals( key ) )
			{
				return currentEndNode;
			}

			if ( currentStartNode.equals( currentEndNode )
				|| currentStartNode.nextNode === null
				|| currentStartNode.nextNode.equals( currentEndNode ) )
			{
				return null;
			}

			currentStartNode = currentStartNode.nextNode;
			currentEndNode = currentEndNode.previousNode;
		}

		return null;
	}

	/**
	 * Removes an item from the LinkedList.
	 *
	 * @param {T} item
	 * The item to remove from the LinkedList.
	 *
	 * @return {boolean}
	 * Returns true if the item was found and successfully removed from the
	 * LinkedList, otherwise false.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 *
	 * @exception {NotSupportedException}
	 * The LinkedList is read-only.
	 */
	public remove( item: KeyValuePair<TKey, TValue> ): boolean
	{
		return this.removeItem( item.key );
	}

	/**
	 * Removes the specified item from the LinkedList.
	 *
	 * @param {TKey} key
	 * The key of the item to remove from the LinkedList.
	 *
	 * @return {boolean}
	 * Returns true if the item was found and successfully removed, otherwise
	 * false.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 *
	 * @exception {NotSupportedException}
	 * The LinkedList is read-only.
	 */
	public removeItem( key: TKey ): boolean
	{
		if ( key === undefined
			|| key === null )
		{
			throw new ArgumentNullException();
		}

		let foundNode = this.node( key );

		if ( foundNode === null )
		{
			return false;
		}

		this._version.counter++;

		if ( foundNode.previousNode === null )
		{
			if ( foundNode.nextNode === null )
			{
				this._endNode = null;
				this._startNode = null;
			}
			else
			{
				this._startNode = foundNode.nextNode;
				this._startNode.previousNode = null;
			}
		}
		else
		{
			if ( foundNode.nextNode === null )
			{
				this._endNode = foundNode.previousNode;
				this._endNode.nextNode = null;
			}
			else
			{
				foundNode.previousNode.nextNode = foundNode.nextNode;
				foundNode.nextNode.previousNode = foundNode.previousNode;
			}
		}

		this._count--;

		foundNode.dispose();

		return true;
	}

	/**
	 * Gets the value of a item with the specified key.
	 *
	 * @param {TKey} key
	 * The key of the item, whose value is wanted.
	 *
	 * @param {(TValue|undefined)=>any} outValue
	 * Return the value of the item, or undefined.
	 *
	 * @return {boolean}
	 * When true is returned, the value of the item has been returned,
	 * otherwise false indicates a return of undefined.
	 *
	 * @exception {ArgumentNullException}
	 * The key is null.
	 */
	public tryGetValue( key: TKey, outValue: ( outValue: ( TValue | undefined ) ) => any ): boolean
	{
		if ( key === null )
		{
			throw new ArgumentNullException();
		}

		let foundNode = this.node( key );

		if ( foundNode === null )
		{
			outValue( undefined );
			return false;
		}
		else
		{
			outValue( foundNode.value );
			return true;
		}
	}
}

export default LinkedList;

class LinkedListEnumerator<TKey extends Object, TValue extends Object> extends Object implements IDictionaryEnumerator<TKey, TValue>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TKey extends Object, TValue extends Object>( startNode: ( LinkedNode<TKey, TValue> | null ), version: LinkedVersion ): LinkedListEnumerator<TKey, TValue>
	{
		return new LinkedListEnumerator( startNode, version );
	}

	//////
	//
	//  Constructor
	//
	//////

	private constructor( startNode: ( LinkedNode<TKey, TValue> | null ), version: LinkedVersion )
	{
		super();

		this._currentNode = null;
		this._currentVersion = version;
		this._startNode = startNode;
		this._startVersionCounter = version.counter;
	}

	//////
	//
	//  Properties
	//
	//////

	private _currentNode: ( LinkedNode<TKey, TValue> | null | undefined );
	private _currentVersion: LinkedVersion;
	private _startNode: ( LinkedNode<TKey, TValue> | null );
	private _startVersionCounter: number;

	public get current(): ( KeyValuePair<TKey, TValue> | undefined )
	{
		if ( this._currentNode === undefined
			|| this._currentNode === null )
		{
			return undefined;
		}
		else
		{
			return new KeyValuePair( this._currentNode.key, this._currentNode.value );
		}
	}

	public get entry(): KeyValuePair<TKey, TValue>
	{
		if ( this._currentNode === undefined
			|| this._currentNode === null )
		{
			throw new InvalidOperationException();
		}
		else
		{
			return new KeyValuePair( this._currentNode.key, this._currentNode.value );
		}
	}

	public get key(): TKey
	{
		if ( this._currentNode === undefined
			|| this._currentNode === null )
		{
			throw new InvalidOperationException();
		}
		else
		{
			return this._currentNode.key;
		}
	}

	public get node(): LinkedNode<TKey, TValue>
	{
		if ( this._currentNode === undefined
			|| this._currentNode === null )
		{
			throw new InvalidOperationException();
		}
		else
		{
			return this._currentNode;
		}
	}

	public get value(): TValue
	{
		if ( this._currentNode === undefined
			|| this._currentNode === null )
		{
			throw new InvalidOperationException();
		}
		else
		{
			return this._currentNode.value;
		}
	}

	//////
	//
	//  Functions
	//
	//////

	public dispose()
	{
		delete this._currentNode;
		delete this._currentVersion;
		delete this._startNode;
		delete this._startVersionCounter;
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public moveNext(): boolean
	{
		if ( this._currentVersion.counter !== this._startVersionCounter )
		{
			throw new InvalidOperationException();
		}

		if ( this._currentNode === undefined )
		{
			this._currentNode = this._startNode;
		}
		else if ( this._currentNode !== null )
		{
			this._currentNode = this._currentNode.nextNode;
		}

		return ( this._currentNode !== null );
	}

	public reset()
	{
		this._currentNode = undefined;
	}
}

class LinkedKeyCollection<TKey extends Object, TValue extends Object> extends Object implements ICollection<TKey>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TKey extends Object, TValue extends Object>( startNode: ( LinkedNode<TKey, TValue> | null ), count: number, version: LinkedVersion ): LinkedKeyCollection<TKey, TValue>
	{
		return new LinkedKeyCollection( startNode, count, version );
	}

	//////
	//
	//  Constructors
	//
	//////

	private constructor( startNode: ( LinkedNode<TKey, TValue> | null ), count: number, version: LinkedVersion )
	{
		super();

		this._count = count;
		this._startNode = startNode;
		this._startVersion = version;
	}

	//////
	//
	//  Properties
	//
	//////

	private _count: number;
	private _startNode: ( LinkedNode<TKey, TValue> | null );
	private _startVersion: LinkedVersion;

	public get count(): number
	{
		return this._count;
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

	public add( item: TKey )
	{
		throw new NotSupportedException();
	}

	public clear()
	{
		throw new NotSupportedException();
	}

	public contains( item: TKey ): boolean
	{
		let found = this.forEach(
			item =>
			{
				if ( item.equals( item ) )
				{
					return true;
				}
			}
		);

		return ( found || false );
	}

	public copyTo( array: TKey[], arrayIndex: number )
	{
		if ( arrayIndex < 0 )
		{
			throw new ArgumentOutOfRangeException();
		}

		if ( array.length - arrayIndex < this.count )
		{
			throw new ArgumentException();
		}

		this.forEach( key => array[arrayIndex] = key );
	}

	public forEach<TReturn>( delegate: ( item: TKey, enumerable: IEnumerable<TKey> ) => ( TReturn | void ), thisArg?: any ): ( TReturn | undefined )
	{
		let enumerator = this.getEnumerator();
		let callReturn = null as any;

		while ( enumerator.moveNext() )
		{
			if ( enumerator.current === undefined )
			{
				return;
			}

			callReturn = delegate.call( thisArg, enumerator.current, this );

			if ( callReturn !== undefined )
			{
				break;
			}
		}

		return callReturn;
	}

	public getEnumerator(): IEnumerator<TKey>
	{
		return LinkedKeyCollectionEnumerator.of( this._startNode, this._startVersion );
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public remove( item: TKey ): boolean
	{
		throw new NotSupportedException();
	}
}

class LinkedKeyCollectionEnumerator<TKey extends Object, TValue extends Object> extends Object implements IEnumerator<TKey>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TKey extends Object, TValue extends Object>( startNode: ( LinkedNode<TKey, TValue> | null ), version: LinkedVersion ): LinkedKeyCollectionEnumerator<TKey, TValue>
	{
		return new LinkedKeyCollectionEnumerator( startNode, version );
	}

	//////
	//
	//  Constructor
	//
	//////

	private constructor( startNode: ( LinkedNode<TKey, TValue> | null ), version: LinkedVersion )
	{
		super();

		this._currentVersion = version;
		this._startNode = startNode;
		this._startVersionCounter = version.counter;

		this.reset();
	}

	//////
	//
	//  Properties
	//
	//////

	private _currentNode: ( LinkedNode<TKey, TValue> | null | undefined );
	private _currentVersion: LinkedVersion;
	private _startNode: ( LinkedNode<TKey, TValue> | null );
	private _startVersionCounter: number;

	public get current(): ( TKey | undefined )
	{
		if ( this._currentNode === undefined
			|| this._currentNode === null )
		{
			return undefined;
		}
		else
		{
			return this._currentNode.key;
		}
	}

	//////
	//
	//  Functions
	//
	//////

	public dispose()
	{
		delete this._currentNode;
		delete this._currentVersion;
		delete this._startNode;
		delete this._startVersionCounter;
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public moveNext(): boolean
	{
		if ( this._currentVersion.counter !== this._startVersionCounter )
		{
			throw new InvalidOperationException();
		}

		if ( this._currentNode === undefined )
		{
			this._currentNode = this._startNode;
		}
		else if ( this._currentNode !== null )
		{
			this._currentNode = this._currentNode.nextNode;
		}

		return ( this._currentNode !== null );
	}

	public reset()
	{
		this._currentNode = undefined;
	}
}

class LinkedValueCollection<TKey extends Object, TValue extends Object> extends Object implements ICollection<TValue>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TKey extends Object, TValue extends Object>( startNode: ( LinkedNode<TKey, TValue> | null ), count: number, version: LinkedVersion ): LinkedValueCollection<TKey, TValue>
	{
		return new LinkedValueCollection( startNode, count, version );
	}

	//////
	//
	//  Constructors
	//
	//////

	private constructor( startNode: ( LinkedNode<TKey, TValue> | null ), count: number, version: LinkedVersion )
	{
		super();

		this._count = count;
		this._currentVersion = version;
		this._startNode = startNode;
		this._startVersionCounter = version.counter;
	}

	//////
	//
	//  Properties
	//
	//////

	private _count: number;
	private _currentVersion: LinkedVersion;
	private _startNode: ( LinkedNode<TKey, TValue> | null );
	private _startVersionCounter: number;

	public get count(): number
	{
		return this._count;
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

	public add( item: TValue )
	{
		throw new NotSupportedException();
	}

	public clear()
	{
		throw new NotSupportedException();
	}

	public contains( item: TValue ): boolean
	{
		let found = this.forEach(
			item =>
			{
				if ( item.equals( item ) )
				{
					return true;
				}
			}
		);

		return ( found || false );
	}

	public copyTo( array: TValue[], arrayIndex: number )
	{
		if ( arrayIndex < 0 )
		{
			throw new ArgumentOutOfRangeException();
		}

		if ( array.length - arrayIndex < this.count )
		{
			throw new ArgumentException();
		}

		this.forEach( value => array[arrayIndex] = value );
	}

	public forEach<TReturn>( delegate: ( item: TValue, enumerable: IEnumerable<TValue> ) => ( TReturn | void ), thisArg?: any ): ( TReturn | undefined )
	{
		let enumerator = this.getEnumerator();
		let callReturn = null as any;

		while ( enumerator.moveNext() )
		{
			if ( enumerator.current === undefined )
			{
				return;
			}

			callReturn = delegate.call( thisArg, enumerator.current, this );

			if ( callReturn !== undefined )
			{
				break;
			}
		}

		return callReturn;
	}

	public getEnumerator(): IEnumerator<TValue>
	{
		return LinkedValueCollectionEnumerator.of( this._startNode, this._currentVersion );
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public remove( item: TValue ): boolean
	{
		throw new NotSupportedException();
	}
}

class LinkedValueCollectionEnumerator<TKey extends Object, TValue extends Object> extends Object implements IEnumerator<TValue>
{
	//////
	//
	//  Static Functions
	//
	//////

	public static of<TKey extends Object, TValue extends Object>( startNode: ( LinkedNode<TKey, TValue> | null ), version: LinkedVersion ): LinkedValueCollectionEnumerator<TKey, TValue>
	{
		return new LinkedValueCollectionEnumerator( startNode, version );
	}

	//////
	//
	//  Constructor
	//
	//////

	private constructor( startNode: ( LinkedNode<TKey, TValue> | null ), version: LinkedVersion )
	{
		super();

		this._currentVersion = version;
		this._startNode = startNode;
		this._startVersionCounter = version.counter;

		this.reset();
	}

	//////
	//
	//  Properties
	//
	//////

	private _currentNode: ( LinkedNode<TKey, TValue> | null | undefined );
	private _currentVersion: LinkedVersion;
	private _startNode: ( LinkedNode<TKey, TValue> | null );
	private _startVersionCounter: number;

	public get current(): ( TValue | undefined )
	{
		if ( this._currentNode === undefined
			|| this._currentNode === null )
		{
			return undefined;
		}
		else
		{
			return this._currentNode.value;
		}
	}

	//////
	//
	//  Functions
	//
	//////

	public dispose()
	{
		delete this._currentNode;
		delete this._currentVersion;
		delete this._startNode;
		delete this._startVersionCounter;
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	public moveNext(): boolean
	{
		if ( this._currentVersion.counter !== this._startVersionCounter )
		{
			throw new InvalidOperationException();
		}

		if ( this._currentNode === undefined )
		{
			this._currentNode = this._startNode;
		}
		else if ( this._currentNode !== null )
		{
			this._currentNode = this._currentNode.nextNode;
		}

		return ( this._currentNode !== null );
	}

	public reset()
	{
		this._currentNode = undefined;
	}
}

class LinkedNode<TKey extends Object, TValue extends Object> extends Object implements IDisposable
{
	//////
	//
	//  Constructor
	//
	//////

	public constructor( key: TKey, value: TValue )
	{
		super();

		this.key = key;
		this.nextNode = null;
		this.previousNode = null;
		this.value = value;
	}

	//////
	//
	//  Properties
	//
	//////

	public key: TKey;
	public nextNode: ( LinkedNode<TKey, TValue> | null );
	public previousNode: ( LinkedNode<TKey, TValue> | null );
	public value: TValue;

	//////
	//
	//  Functions
	//
	//////

	public dispose()
	{
		delete this.key;
		delete this.nextNode;
		delete this.previousNode;
		delete this.value;
	}

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

class LinkedVersion extends Object
{
	//////
	//
	//  Properties
	//
	//////

	public counter: number;

	//////
	//
	//  Functions
	//
	//////

	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}
