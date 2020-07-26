import React from 'react';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            results: [],
            loading: false,
            message: '',
        };
    }

    //fetch results from API with user input value
    getResults = (subject) => {
        const searchUrl = `https://api.github.com/search/repositories?q=${subject}`;

        axios.get(searchUrl)
            .then(res => {
                this.setState({
                    results: res.data.items,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    message: 'Network error!'
                })
            })
    };

    //function handling input change 
    handleChange = (event) => {
        const subject = event.target.value;
        if (!subject) {
            this.setState({ subject, results: {}, message: '' });
        } else {
            this.setState({ subject, loading: true, message: '' }, () => {
                //to get result with the change in input
                this.getResults(subject);
            });
        }
    };

    //get all results and link result to URL
    renderResults = () => {
        const { results } = this.state;

        if (results.length) {
            return (
                <div>
                    {results.map(result => {
                        return (
                            <a key={result.id} href={result.html_url} className="result-item">
                                <h5> 
                                    {result.name} <br />
                                    <label>Stargazers Count: </label>{result.stargazers_count} <br /> 
                                    <label>Watchers Count: </label>{result.watchers_count} 
                                </h5>
                            </a>
                        )
                    })}

                </div>
            )
        }
    };

    render() {
        const { subject, message } = this.state;
        return (
            <div>
                <h2> Search on Github </h2>
                <input
                    type="text"
                    value={subject}
                    id="search-input"
                    placeholder="Type for Search"
                    onChange={this.handleChange}
                />

                {/* Error Message */}
                {message}

                {/* Search Results */}
                {this.renderResults()}
            </div>
        )
    }
}

export default Search
