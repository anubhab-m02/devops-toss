from flask import Flask, render_template, jsonify, request
import cirq

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quantum_toss')
def quantum_toss():
    num_qubits = 1

    # Create a quantum circuit
    circuit = cirq.Circuit()

    # Create a qubit
    qubit = cirq.LineQubit(0)

    # Apply a Hadamard gate to create superposition
    circuit.append(cirq.H(qubit))

    # Measure the qubit to get the outcome of the toss
    circuit.append(cirq.measure(qubit, key='result'))

    # Simulate the circuit to get the results
    simulator = cirq.Simulator()
    result = simulator.run(circuit, repetitions=int(request.args.get('shots', 1)))

    # Get the measurement results
    measurements = result.measurements['result']

    # Convert measurement results to JSON-serializable format
    toss_results = [int(measurement) for measurement in measurements.flatten()]

    # Return the toss results as JSON
    return jsonify({
        'toss_results': toss_results
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
