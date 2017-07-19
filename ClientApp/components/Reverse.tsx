import * as React from 'react';
import { Debounce } from 'react-throttle';

interface ReverseState {
    value: string;
    reversedValue: string;
    loading: boolean;
}


export class Reverse extends React.Component<{}, ReverseState> {
    constructor() {
        super();
        this.state = { value: '', reversedValue: '', loading: true };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {

        this.setState({ value: event.target.value.toUpperCase() });
        fetch('/api/SampleData/' + event.target.value)
            .then(response => response.text())
            .then(data => {
                this.setState({ reversedValue: data, loading: false });
            });
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>yes?...</em></p>
            : (this.state.reversedValue);

        return <div>
            <h1>Reverse</h1>
            <form>
                <label>
                    Name:
                    <Debounce time="400" handler="onChange">
                        <input type="text" onChange={this.handleChange} />
                    </Debounce>
                </label>
                <h3>{contents}</h3>
            </form>
        </div>;
    }

}