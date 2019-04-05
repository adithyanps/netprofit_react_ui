import React, {Component} from 'react';
import {Pagination} from 'react-bootstrap';
import './Pagination.css';



class Pagex extends Component {

    render(){
        let items = [];
        let active = 1;
        let total_items = this.props.item_count
        let items_perpage = this.props.perpage_count
        let pagecount = total_items%items_perpage===0 ? total_items/items_perpage : Math.floor(total_items/items_perpage)+1
        for(let number=1; number<=pagecount; number++){
            items.push(
                <Pagination.Item key={number} active={number === this.props.page} onClick={() => this.props.click(number)}>{number}</Pagination.Item>
              );
        }

        return(
            <div >
                <Pagination bssize="small">
                  <Pagination.Item
                      disabled={this.props.firstDisabled}
                      onClick={() => this.props.firstClick()}> First Page</Pagination.Item>
                  <Pagination.Item
                      disabled={this.props.prevDisabled}
                      onClick={() => this.props.prevClick()}> &larr; Previous Page</Pagination.Item>
                  {items}
                  <Pagination.Item
                      disabled={this.props.nxtDisabled}
                      onClick={() => this.props.nxtClick()}>Next Page &rarr;</Pagination.Item>
                  <Pagination.Item
                      disabled={this.props.lastDisabled}
                      onClick={() => this.props.lastClick()}> Last Page</Pagination.Item>
                </Pagination>
            </div>
        );
    }
}

export default Pagex;
