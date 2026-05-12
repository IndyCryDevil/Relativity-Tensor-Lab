'use client'

import { useState } from 'react'

import {
  MathJax
} from 'better-react-mathjax'

export default function Home() {

  const [coordinates, setCoordinates] =
    useState('t, r, theta, phi')

  const [metric, setMetric] = useState(
`[
["-exp(2*Phi)", "0", "0", "0"],

["0", "1/(1-b/r)", "0", "0"],

["0", "0", "r**2", "0"],

["0", "0", "0", "r**2*sin(theta)**2"]
]`
  )
const [selectedMetric, setSelectedMetric] =
  useState('schwarzschild')
  const metricPresets: any = {

  schwarzschild:

`[
["-(1-2*M/r)", "0", "0", "0"],

["0", "1/(1-2*M/r)", "0", "0"],

["0", "0", "r**2", "0"],

["0", "0", "0", "r**2*sin(theta)**2"]
]`,

ads:

`[
["-(1+r**2/L**2)", "0", "0", "0"],

["0", "1/(1+r**2/L**2)", "0", "0"],

["0", "0", "r**2", "0"],

["0", "0", "0", "r**2*sin(theta)**2"]

]`,

  morristhorne:

`[
["-exp(2*Phi)", "0", "0", "0"],

["0", "1/(1-b/r)", "0", "0"],

["0", "0", "r**2", "0"],

["0", "0", "0", "r**2*sin(theta)**2"]
]`,

  flrw:

`[
["-1", "0", "0", "0"],

["0", "a(t)**2/(1-k*r**2)", "0", "0"],

["0", "0", "a(t)**2*r**2", "0"],

["0", "0", "0", "a(t)**2*r**2*sin(theta)**2"]
]`,

reissnernordstrom:

`[
["-(1-2*M/r+Q**2/r**2)", "0", "0", "0"],

["0", "1/(1-2*M/r+Q**2/r**2)", "0", "0"],

["0", "0", "r**2", "0"],

["0", "0", "0", "r**2*sin(theta)**2"]

]`,

twosphere:

`[
["1", "0"],

["0", "sin(theta)**2"]

]`,

desitter:

`[
["-(1-Lambda0*r**2/3)", "0", "0", "0"],

["0", "1/(1-Lambda0*r**2/3)", "0", "0"],

["0", "0", "r**2", "0"],

["0", "0", "0", "r**2*sin(theta)**2"]

]`,
}

const metricLatex: any = {

  schwarzschild:

`ds^2 = -(1-\\frac{2M}{r})dt^2
+ \\frac{dr^2}{1-\\frac{2M}{r}}
+ r^2 d\\theta^2
+ r^2 \\sin^2(\\theta)d\\phi^2`,

  reissnernordstrom:

`ds^2 = -(1-\\frac{2M}{r}+\\frac{Q^2}{r^2})dt^2
+ \\frac{dr^2}{1-\\frac{2M}{r}+\\frac{Q^2}{r^2}}
+ r^2 d\\theta^2
+ r^2 \\sin^2(\\theta)d\\phi^2`,

  morristhorne:

`ds^2 =
-e^{2\\Phi(r)}dt^2
+ \\frac{dr^2}{1-\\frac{b(r)}{r}}
+ r^2 d\\theta^2
+ r^2 \\sin^2(\\theta)d\\phi^2`,

ads:

`ds^2=-(1+\\frac{r^2}{L^2})dt^2+
\\frac{dr^2}{1+\\frac{r^2}{L^2}}+
r^2d\\theta^2+
r^2\\sin^2(\\theta)d\\phi^2`,

  flrw:

`ds^2 =
-dt^2
+
\\frac{a^2(t)}{1-k r^2}dr^2
+
a^2(t)r^2 d\\theta^2
+
a^2(t)r^2\\sin^2(\\theta)d\\phi^2`,

twosphere:

`ds^2=d\\theta^2+\\sin^2(\\theta)d\\phi^2`,

desitter:

`ds^2=-(1-\\frac{\\Lambda r^2}{3})dt^2+
\\frac{dr^2}{1-\\frac{\\Lambda r^2}{3}}+
r^2d\\theta^2+
r^2\\sin^2(\\theta)d\\phi^2`,
}

const metricMatrixLatex: any = {

  schwarzschild:

`g_{\\mu\\nu}=
\\begin{bmatrix}

-(1-\\frac{2M}{r}) & 0 & 0 & 0 \\\\

0 & \\frac{1}{1-\\frac{2M}{r}} & 0 & 0 \\\\

0 & 0 & r^2 & 0 \\\\

0 & 0 & 0 & r^2\\sin^2(\\theta)

\\end{bmatrix}`,

ads:

`g_{\\mu\\nu}=
\\begin{bmatrix}

-(1+\\frac{r^2}{L^2}) & 0 & 0 & 0 \\\\

0 & \\frac{1}{1+\\frac{r^2}{L^2}} & 0 & 0 \\\\

0 & 0 & r^2 & 0 \\\\

0 & 0 & 0 & r^2\\sin^2(\\theta)

\\end{bmatrix}`,

  reissnernordstrom:

`g_{\\mu\\nu}=
\\begin{bmatrix}

-(1-\\frac{2M}{r}+\\frac{Q^2}{r^2}) & 0 & 0 & 0 \\\\

0 & \\frac{1}{1-\\frac{2M}{r}+\\frac{Q^2}{r^2}} & 0 & 0 \\\\

0 & 0 & r^2 & 0 \\\\

0 & 0 & 0 & r^2\\sin^2(\\theta)

\\end{bmatrix}`,



  morristhorne:

`g_{\\mu\\nu}=
\\begin{bmatrix}

-e^{2\\Phi(r)} & 0 & 0 & 0 \\\\

0 & \\frac{1}{1-\\frac{b(r)}{r}} & 0 & 0 \\\\

0 & 0 & r^2 & 0 \\\\

0 & 0 & 0 & r^2\\sin^2(\\theta)

\\end{bmatrix}`,



  flrw:

`g_{\\mu\\nu}=
\\begin{bmatrix}

-1 & 0 & 0 & 0 \\\\

0 & \\frac{a^2(t)}{1-k r^2} & 0 & 0 \\\\

0 & 0 & a^2(t)r^2 & 0 \\\\

0 & 0 & 0 & a^2(t)r^2\\sin^2(\\theta)

\\end{bmatrix}`,

twosphere:

`g_{\\mu\\nu}=
\\begin{bmatrix}

1 & 0 \\\\

0 & \\sin^2(\\theta)

\\end{bmatrix}`,

desitter:

`g_{\\mu\\nu}=
\\begin{bmatrix}

-(1-\\frac{\\Lambda r^2}{3}) & 0 & 0 & 0 \\\\

0 & \\frac{1}{1-\\frac{\\Lambda r^2}{3}} & 0 & 0 \\\\

0 & 0 & r^2 & 0 \\\\

0 & 0 & 0 & r^2\\sin^2(\\theta)

\\end{bmatrix}`,
}
  const [result, setResult] =
    useState<any>('')

  const [loading, setLoading] =
    useState(false)

  async function calculateTensor(
    endpoint: string
  ) {

    setLoading(true)

    try {

      const response = await fetch(

        `https://relativity-tensor-lab.onrender.com`,

        {

          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            metric: JSON.parse(metric),

            coordinates:
              coordinates
                .split(',')
                .map(
                  item => item.trim()
                )

          })

        }

      )

      const data = await response.json()

      const value =
        Object.values(data)[0]

      setResult(value)

    } catch (error) {

      setResult(
        'Error computing tensor.'
      )

    }

    setLoading(false)

  }

  return (

    <main className="min-h-screen bg-black text-white px-6 py-12">

      {/* Hero */}

      <section className="text-center mb-20">

        <h1 className="text-6xl font-bold mb-6">
          Tensor Calculator
        </h1>

      </section>

      {/* Calculator */}

      <section className="max-w-6xl mx-auto bg-gray-900 p-10 rounded-3xl">
<div className="mb-8">

  <label className="block mb-3">

    Select Metric

  </label>

  <select

    value={selectedMetric}

    onChange={(e) => {

  const value = e.target.value

  setSelectedMetric(value)

  setMetric(
    metricPresets[value]
  )

  if(value === "twosphere") {

    setCoordinates(
      "theta, phi"
    )

  }

  else {

    setCoordinates(
      "t, r, theta, phi"
    )

  }

}}

    className="w-full bg-black border border-gray-700 rounded-xl p-4"

  >

    <option value="schwarzschild">

      Schwarzschild Metric

    </option>

    <option value="ads">

      Anti-de Sitter Metric

    </option>

    <option value="morristhorne">

      Morris-Thorne Wormhole

    </option>

    <option value="flrw">

      FLRW Cosmology

    </option>

    <option value="reissnernordstrom">

     Reissner–Nordström Metric

    </option>

    <option value="twosphere">

     2-Sphere Metric

    </option>

    <option value="desitter">

     de Sitter Metric

    </option>

  </select>

</div>

<div className="mb-10">

  <h2 className="text-2xl font-bold mb-4">

    Metric Tensor

  </h2>

  <div className="bg-black p-6 rounded-2xl overflow-auto text-green-400 text-xl">

    <MathJax>

      {`\\[
      ${metricLatex[selectedMetric]}
      \\]`}

    </MathJax>
    <div className="mt-10 bg-white text-black p-8 rounded-2xl overflow-auto text-2xl">

  <MathJax>

    {`\\[
    ${metricMatrixLatex[selectedMetric]}
    \\]`}

  </MathJax>

  </div>

  </div>

</div>
        {/* Coordinates */}

        <div className="mb-6">

          <label className="block mb-3">
            Coordinates
          </label>

          <input
            type="text"
            value={coordinates}
            onChange={(e) =>
              setCoordinates(e.target.value)
            }
            className="w-full bg-black border border-gray-700 rounded-xl p-4"
          />

        </div>

        {/* Metric */}

        <div className="mb-8">

          <label className="block mb-3">
            Metric Tensor
          </label>

          <textarea
            value={metric}
            onChange={(e) =>
              setMetric(e.target.value)
            }
            className="w-full h-72 bg-black border border-gray-700 rounded-xl p-4 font-mono"
          />

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">

          <button
            onClick={() =>
              calculateTensor(
                'christoffel'
              )
            }
            className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-2xl font-semibold"
          >
            Christoffel Symbols
          </button>

          <button
            onClick={() =>
              calculateTensor(
                'riemann-second'
              )
            }
            className="bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-2xl font-semibold"
          >
            Riemann Tensor
          </button>

          <button
            onClick={() =>
              calculateTensor(
                'ricci'
              )
            }
            className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-2xl font-semibold"
          >
            Ricci Tensor
          </button>

          <button
            onClick={() =>
              calculateTensor(
                'ricci-scalar'
              )
            }
            className="bg-yellow-600 hover:bg-yellow-700 px-6 py-4 rounded-2xl font-semibold"
          >
            Ricci Scalar
          </button>

          <button
            onClick={() =>
              calculateTensor(
                'einstein'
              )
            }
            className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-2xl font-semibold"
          >
            Einstein Tensor
          </button>

        </div>

        {/* Loading */}

        {

          loading && (

            <div className="mb-6 text-blue-400">

              Computing tensor...

            </div>

          )

        }

        {/* Result */}

        <div>

          <h2 className="text-3xl font-bold mb-6">
            Result
          </h2>

          <div className="bg-black p-6 rounded-2xl overflow-auto text-green-400 font-mono whitespace-pre-wrap">

            {

              Array.isArray(result)

                ? result.map(

                    (
                      item: any,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="mb-3"
                      >

                        <MathJax>

                          {`\\(${item}\\)`}

                        </MathJax>

                      </div>

                    )

                  )

                : result

            }

          </div>

        </div>

      </section>

    </main>

  )

}