import React, {Component} from 'react';
import {render} from 'react-dom';

import '../css/style.scss';

class WhatToBuyApp extends React.Component {

    constructor(props) {
        super(props);
        var items = JSON.parse(localStorage.getItem('items')) || [];
        this.state = { items: items };
        this.addItem = this.addItem.bind(this);
        this.touchItem = this.touchItem.bind(this);
        this.removeItems = this.removeItems.bind(this);
    }

    addItem(item) {
        var itemsTmp = this.state.items;
        itemsTmp.push({value: item, selected: false});
        this.setState({
            items: itemsTmp
        });
        localStorage.setItem('items', JSON.stringify(itemsTmp));
    }

    touchItem(index) {
        var itemsTmp = this.state.items;
        itemsTmp[index].selected = !itemsTmp[index].selected;
        this.setState({
            items: itemsTmp
        });
        console.debug("touchItem ...");
        console.debug(this.state.items);
    }

    removeItems() {
        var itemsTmp = this.state.items;
        for (var i = itemsTmp.length - 1; i >= 0; --i) {
            if (itemsTmp[i].selected === true) {
                itemsTmp.splice(i, 1);
            }
        }
        this.setState({
            items: itemsTmp
        });
        console.debug("removeItems ...");
        console.debug(this.state.items);
        localStorage.setItem('items', JSON.stringify(itemsTmp));
    }

    render() {
        return (
            <div className="container buying-list-container">
                <Buttons removeItems={this.removeItems}></Buttons>
                <ItemList items={this.state.items} touchItem={this.touchItem}></ItemList>
                <AddItemDialog addItem={this.addItem}></AddItemDialog>
            </div>
        );
    }
}

class Buttons extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 buttons-section">
                    <button type="button" className="btn btn-success" data-toggle="modal" data-target="#add-item-dialog">Add</button>
                    <button type="button" className="btn btn-danger ml-3" onClick={this.props.removeItems}>Delete</button>
                </div>
            </div>
        );
    }
}

class ItemList extends React.Component {

    render() {
        var self = this;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <table className="table table-darkX buying-list">
                        <thead className="thead-dark">
                        <tr>
                            <th className="buying-list__row-sm"></th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>{
                            this.props.items.map(function (item, index) {
                                return (
                                    <tr>
                                        <td><input type="checkbox" checked={item.selected}  value="{index}" onClick={() => self.props.touchItem(index)}/></td>
                                        <td>{item.value}</td>
                                    </tr>)
                            })
                        }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

class AddItemDialog extends React.Component {

    resetInputField(){
        this.item.value = "";
    }

    render() {
        return (
            <div className="modal" tabIndex="-1" role="dialog" id="add-item-dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="item">Name</label>
                                    <input type="text" className="form-control" id="item" placeholder="Name" ref={(input) => {
                                        this.item = input;
                                    }}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => {this.props.addItem(this.item.value); this.resetInputField();}}>Add</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

render(<WhatToBuyApp/>, document.getElementById('app'));