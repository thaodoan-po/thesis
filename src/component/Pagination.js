import React, { Component } from 'react';


const numberInPageList = 5;

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNumPage: 1,
        };
    }

    UNSAFE_componentWillMount() {
        this.setState({
            firstNumPage: (3 < this.props.currentPage
                ? Math.max(this.props.currentPage - (4 - Math.min(2, this.props.totalPage - this.props.currentPage)), 1)
                : 1
            )
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            firstNumPage: (3 < nextProps.currentPage
                ? Math.max(nextProps.currentPage - (4 - Math.min(2, nextProps.totalPage - nextProps.currentPage)), 1)
                : 1
            )
        });
    }

    nextPageList = (number, e) => {
        e.preventDefault();
        if(number == -1)
        {
            this.props.onChangePage(1);
        }
        else
        { 
            this.props.onChangePage(this.props.totalPage);
        }

    }

    nextPage = (number, e) => {
        e.preventDefault();
        this.props.onChangePage(this.props.currentPage + number);
    }

    changePage = e => {
        e.preventDefault();
        this.props.onChangePage(e.target.innerHTML);
    }

    getNumberPageList = () => {
        var numberPageList = [];
        for (var i = this.state.firstNumPage; i < this.state.firstNumPage + numberInPageList && i <= this.props.totalPage; i++) {
            if (i === this.props.currentPage)
                numberPageList.push(
                    <li key={i} className="active page-item" title={i}><a className="page-link">{i}</a></li>
                );
            else
                numberPageList.push(
                    <li key={i} className="page-item" title={i} onClick={(e) => this.changePage(e)}><a href="#" className="page-link">{i}</a></li>
                );
        }
        return numberPageList;
    }

    render() {
        return (
                    <ul className="react-bootstrap-table-page-btns-ul pagination justify-content-center">
                        {
                            this.state.firstNumPage > 1
                                ? (
                                    <li className="page-item" onClick={(e) => this.nextPageList(-1, e)}>
                                        <a href="/#" className="page-link">
                                            <i className="fa fa-angle-double-left"></i>
                                        </a>
                                    </li>
                                ) : null
                        }
                        {
                            this.props.currentPage > 1
                                ? (
                                    <li className="page-item" onClick={(e) => this.nextPage(-1, e)}>
                                        <a href="/#" className="page-link">
                                            <i className="fa fa-angle-left"></i>
                                        </a>
                                    </li>
                                ) : null
                        }
                        <this.getNumberPageList />
                        {
                            this.props.currentPage < this.props.totalPage
                                ? (
                                    <li className="page-item" onClick={(e) => this.nextPage(1, e)}>
                                        <a href="/#" className="page-link">
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </li>
                                ) : null
                        }
                        {
                            this.state.firstNumPage + numberInPageList - 1 < this.props.totalPage
                                ? (
                                    <li className="page-item" onClick={(e) => this.nextPageList(1, e)}>
                                        <a href="/#" className="page-link">
                                            <i className="fa fa-angle-double-right"></i>
                                        </a>
                                    </li>
                                ) : null
                        }
                    </ul>
        );
    }
}

export { Pagination };