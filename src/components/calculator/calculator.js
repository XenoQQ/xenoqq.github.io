import Mainframe from "./mainframe";
import Display from "./display";
import Keyboard from "./keyboard";
import Key from "./key";
import React, { useState } from "react";
import "./styles/calculator.css";

const keyValues = [
    ["7", "8", "9", "x", "/",],
    ["4", "5", "6", "-", "%",],
    ["1", "2", "3", "+", "C"],
    ["+/-", "0", ".", "="],
];

const Calculator = () => {
    const [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });


    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        if ((String(calc.num)).length < 16) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? "0"
                        : calc.num % 1 === 0
                            ? Number(calc.num + value)
                            : calc.num + value,
                res: !calc.sign ? 0 : calc.res,
            });
        };
    };

    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    }

    const signClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });
    }

    const equalsClickHandler = (e) => {
        if (calc.sign && calc.num) {
            const math = (a, b, sign) =>
                sign === "+"
                    ? a + b
                    : sign === "-"
                        ? a - b
                        : sign === "x"
                            ? a * b
                            : a / b;

            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "/"
                        ? "Без обид, но мы тут не делим на ноль (:"
                        :
                        math(
                            Number(calc.res),
                            Number(calc.num),
                            calc.sign
                        )
                ,
                sign: "",
                num: 0,
            })
        }
    }

    const invertClickHandler = (e) => {
        e.preventDefault();
        setCalc({
            ...calc,
            num: calc.num ? calc.num * -1 : 0,
            res: calc.res ? calc.res * -1 : 0,
            sign: "",
        });
    }

    const percentClickHandler = (e) => {
        e.preventDefault();
        let num = calc.num ? parseFloat(calc.num) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            sign: "x",
        });
    }

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };



    return (
        <Mainframe>


            <Display value={calc.num ? calc.num : calc.res} />


            <Keyboard>
                {
                    keyValues.flat().map((btn, i) => {
                        return (
                            <Key
                                key={i}
                                className={btn === "=" ? "equals" : ""}
                                value={btn}
                                onClick={
                                    btn === "C"
                                        ? resetClickHandler
                                        : btn === "+/-"
                                            ? invertClickHandler
                                            : btn === "%"
                                                ? percentClickHandler
                                                : btn === "="
                                                    ? equalsClickHandler
                                                    : btn === "/" || btn === "x" || btn === "-" || btn === "+"
                                                        ? signClickHandler
                                                        : btn === "."
                                                            ? commaClickHandler
                                                            : numClickHandler

                                }
                            />
                        );
                    })
                }
            </Keyboard>

        </Mainframe>
    )
}

export default Calculator;