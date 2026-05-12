from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from sympy import symbols
from sympy import sympify
from sympy import Function
from sympy import *
from sympy import sin, exp

from einsteinpy.symbolic import (

    MetricTensor,
    ChristoffelSymbols,
    RiemannCurvatureTensor,
    RicciTensor,
    RicciScalar,
    EinsteinTensor

)

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)


class TensorRequest(BaseModel):

    metric: list
    coordinates: list


@app.get("/")
def home():

    return {

        "message":
            "Relativity Tensor Lab Backend Running"

    }


def build_metric(data):

    coord_names = data.coordinates

    coords = symbols(coord_names)

    local_dict = {}

    for coord in coords:

        local_dict[str(coord)] = coord

    if "r" in coord_names:

        r = local_dict["r"]

        local_dict["Phi"] = Function("Phi")(r)

        local_dict["b"] = Function("b")(r)

    if "t" in coord_names:

        t = local_dict["t"]

        local_dict["a"] = Function("a")

    local_dict["M"] = symbols("M")

    local_dict["Q"] = symbols("Q")

    local_dict["Lambda0"] = symbols("Lambda0")

    local_dict["L"] = symbols("L")

    local_dict["sin"] = sin

    local_dict["exp"] = exp

    metric = []

    for row in data.metric:

        metric_row = []

        for item in row:

            metric_row.append(

                sympify(
                    item,
                    locals=local_dict
                )

            )

        metric.append(metric_row)

    metric_tensor = MetricTensor(
        metric,
        coords
    )

    return coords, metric_tensor

def format_tensor(

    tensor,
    symbol="T"

):

    tensor = tensor.tolist()

    formatted_result = []

    dimensions = len(tensor)

    for i in range(dimensions):

        for j in range(dimensions):

            try:

                for k in range(dimensions):

                    try:

                        for l in range(dimensions):

                            value = tensor[i][j][k][l]

                            value = str(value)

                            # Wormhole derivatives

                            value = value.replace(
                                "Derivative(Phi(r), r)",
                                "Phi'(r)"
                            )

                            value = value.replace(
                                "Derivative(b(r), r)",
                                "b'(r)"
                            )

                            value = value.replace(
                                "Derivative(Phi(r), (r, 2))",
                                "Phi''(r)"
                            )

                            value = value.replace(
                                "Derivative(b(r), (r, 2))",
                                "b''(r)"
                            )

                            # FLRW derivatives

                            value = value.replace(
                                "Derivative(a(t), t)",
                                "a'(t)"
                            )

                            value = value.replace(
                                "Derivative(a(t), (t, 2))",
                                "a''(t)"
                            )

                            value = value.replace(
                                "Lambda0",
                                "Λ"
                            )

                            if value != "0":

                                formatted_result.append(

                                    f"{symbol}^{{{i}}}_{{{j}{k}{l}}} = {value}"

                                )

                    except:

                        value = tensor[i][j][k]

                        value = str(value)

                        # Wormhole derivatives

                        value = value.replace(
                            "Derivative(Phi(r), r)",
                            "Phi'(r)"
                        )

                        value = value.replace(
                            "Derivative(b(r), r)",
                            "b'(r)"
                        )

                        value = value.replace(
                            "Derivative(Phi(r), (r, 2))",
                            "Phi''(r)"
                        )

                        value = value.replace(
                            "Derivative(b(r), (r, 2))",
                            "b''(r)"
                        )

                        # FLRW derivatives

                        value = value.replace(
                            "Derivative(a(t), t)",
                            "a'(t)"
                        )

                        value = value.replace(
                            "Derivative(a(t), (t, 2))",
                            "a''(t)"
                        )

                        value = value.replace(
                            "Lambda0",
                            "Λ"
                        )

                        if value != "0":

                            formatted_result.append(

                                f"{symbol}^{{{i}}}_{{{j}{k}}} = {value}"

                            )

            except:

                value = tensor[i][j]

                value = str(value)

                # Wormhole derivatives

                value = value.replace(
                    "Derivative(Phi(r), r)",
                    "Phi'(r)"
                )

                value = value.replace(
                    "Derivative(b(r), r)",
                    "b'(r)"
                )

                value = value.replace(
                    "Derivative(Phi(r), (r, 2))",
                    "Phi''(r)"
                )

                value = value.replace(
                    "Derivative(b(r), (r, 2))",
                    "b''(r)"
                )


                # FLRW derivatives

                value = value.replace(
                    "Derivative(a(t), t)",
                    "a'(t)"
                )

                value = value.replace(
                    "Derivative(a(t), (t, 2))",
                    "a''(t)"
                )

                value = value.replace(
                    "Lambda0",
                    "Λ"
                )

                if value != "0":

                    formatted_result.append(

                        f"{symbol}_{{{i}{j}}} = {value}"

                    )

    return formatted_result

@app.post("/christoffel")
def calculate_christoffel(data: TensorRequest):

    coords, metric_tensor = build_metric(data)

    christoffel = ChristoffelSymbols.from_metric(
        metric_tensor
    )

    return {

        "christoffel_symbols":

            format_tensor(

    christoffel.tensor(),

    symbol="\\Gamma"

)

    }


@app.post("/riemann-second")
def calculate_riemann_second(data: TensorRequest):

    coords, metric_tensor = build_metric(data)

    riemann = RiemannCurvatureTensor.from_metric(
        metric_tensor
    )

    return {

        "riemann_second_kind":

            format_tensor(

    riemann.tensor(),

    symbol="R"

)

    }


@app.post("/ricci")
def calculate_ricci(data: TensorRequest):

    coords, metric_tensor = build_metric(data)

    ricci = RicciTensor.from_metric(
        metric_tensor
    )

    tensor = ricci.tensor().tolist()

    formatted_result = []

    for i in range(len(tensor)):

        for j in range(len(tensor[i])):

            value = tensor[i][j]

            value = str(value)

            # Wormhole derivatives

            value = value.replace(
                "Derivative(Phi(r), r)",
                "Phi'(r)"
            )

            value = value.replace(
                "Derivative(b(r), r)",
                "b'(r)"
            )

            value = value.replace(
                "Derivative(Phi(r), (r, 2))",
                "Phi''(r)"
            )

            value = value.replace(
                "Derivative(b(r), (r, 2))",
                "b''(r)"
            )

            # FLRW derivatives

            value = value.replace(
                "Derivative(a(t), t)",
                "a'(t)"
            )

            value = value.replace(
                "Derivative(a(t), (t, 2))",
                "a''(t)"
            )

            if value != "0":

                formatted_result.append(

                    f"R_{{{i}{j}}} = {value}"

                )

    return {

        "ricci_tensor":
            formatted_result

    }

@app.post("/ricci-scalar")
def calculate_ricci_scalar(data: TensorRequest):

    coords, metric_tensor = build_metric(data)

    scalar = RicciScalar.from_metric(
        metric_tensor
    )

    value = str(scalar.expr)

    # Wormhole derivatives

    value = value.replace(
        "Derivative(Phi(r), r)",
        "Phi'(r)"
    )

    value = value.replace(
        "Derivative(b(r), r)",
        "b'(r)"
    )

    value = value.replace(
        "Derivative(Phi(r), (r, 2))",
        "Phi''(r)"
    )

    value = value.replace(
        "Derivative(b(r), (r, 2))",
        "b''(r)"
    )

    # FLRW derivatives

    value = value.replace(
        "Derivative(a(t), t)",
        "a'(t)"
    )

    value = value.replace(
        "Derivative(a(t), (t, 2))",
        "a''(t)"
    )

    return {

        "ricci_scalar":

            [f"R = {value}"]

    }


@app.post("/einstein")
def calculate_einstein(data: TensorRequest):

    coords, metric_tensor = build_metric(data)

    einstein = EinsteinTensor.from_metric(
        metric_tensor
    )

    tensor = einstein.tensor().tolist()

    formatted_result = []

    for i in range(len(tensor)):

        for j in range(len(tensor[i])):

            value = tensor[i][j]

            value = str(value)

            # Wormhole derivatives

            value = value.replace(
                "Derivative(Phi(r), r)",
                "Phi'(r)"
            )

            value = value.replace(
                "Derivative(b(r), r)",
                "b'(r)"
            )

            value = value.replace(
                "Derivative(Phi(r), (r, 2))",
                "Phi''(r)"
            )

            value = value.replace(
                "Derivative(b(r), (r, 2))",
                "b''(r)"
            )

            # FLRW derivatives

            value = value.replace(
                "Derivative(a(t), t)",
                "a'(t)"
            )

            value = value.replace(
                "Derivative(a(t), (t, 2))",
                "a''(t)"
            )

            if value != "0":

                formatted_result.append(

                    f"G_{{{i}{j}}} = {value}"

                )

    return {

        "einstein_tensor":
            formatted_result

    }