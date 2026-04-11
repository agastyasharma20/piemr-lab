export interface COAExperiment {
  id: string;
  title: string;
  aim: string;
  theory: string;
  algorithm: string;
  simulationType: 'logic' | 'assembly';
  logicType?: 'mux' | 'demux' | 'half-adder' | 'half-sub' | 'full-adder' | 'full-sub';
}

export const coaExperiments: COAExperiment[] = [
  {
    id: 'exp-1',
    title: 'Multiplexer and Demultiplexer',
    aim: 'Study of Multiplexer and Demultiplexer logic circuits.',
    theory: `
      <p>A <strong>Multiplexer (MUX)</strong> is a combinational circuit that selects binary information from one of many input lines and directs it to a single output line. The selection is directed by a separate set of selection lines.</p>
      <p>A <strong>Demultiplexer (DEMUX)</strong> performs the reverse operation. It takes a single input line and routes it to one of several digital output lines.</p>
    `,
    algorithm: `
      <p><b>MUX Operation:</b></p>
      <ol>
        <li><b>INPUT:</b> Set data inputs (D0, D1...) and Select lines (S0, S1...).</li>
        <li><b>SELECTION:</b> The binary value of the select lines determines which input is routed to the output.</li>
        <li><b>OUTPUT:</b> Y = D[S].</li>
      </ol>
    `,
    simulationType: 'logic',
    logicType: 'mux'
  },
  {
    id: 'exp-2',
    title: 'Half Adder and Subtractor',
    aim: 'Study of Half Adder and Subtractor circuits.',
    theory: `
      <p>A <strong>Half Adder</strong> is a combinational logic circuit that adds two 1-bit digits. It produces a Sum and a Carry.</p>
      <p>A <strong>Half Subtractor</strong> subtracts one 1-bit number from another, producing a Difference and a Borrow.</p>
    `,
    algorithm: `
      <p><b>Half Adder Logic:</b></p>
      <ul>
        <li><b>Sum:</b> A XOR B</li>
        <li><b>Carry:</b> A AND B</li>
      </ul>
    `,
    simulationType: 'logic',
    logicType: 'half-adder'
  },
  {
    id: 'exp-3',
    title: 'Full Adder and Subtractor',
    aim: 'Study of Full Adder and Subtractor circuits.',
    theory: `
      <p>A <strong>Full Adder</strong> adds three 1-bit numbers (A, B, and a Carry-in), useful for chaining multiple adders together.</p>
      <p>A <strong>Full Subtractor</strong> handles subtraction of three bits (Minuend, Subtrahend, and Borrow-in).</p>
    `,
    algorithm: `
      <p><b>Full Adder Logic:</b></p>
      <ul>
        <li><b>Sum:</b> (A XOR B) XOR Cin</li>
        <li><b>Cout:</b> (A AND B) OR (Cin AND (A XOR B))</li>
      </ul>
    `,
    simulationType: 'logic',
    logicType: 'full-adder'
  },
  {
    id: 'exp-4',
    title: 'Add Two 8-bit Numbers',
    aim: 'WAP to add two 8 bit numbers and store the result at memory location 2000.',
    theory: `
      <p>This assembly program demonstrates basic arithmetic operations by adding two 8-bit hexadecimal payloads. The CPU fetches operands, passes them through the ALU, and stores the result.</p>
    `,
    algorithm: `
      <ol>
        <li><b>LOAD:</b> Load the first 8-bit number into Accumulator (A).</li>
        <li><b>ADD:</b> Add the second 8-bit number from a register to A.</li>
        <li><b>STORE:</b> Store the content of A into memory location 2000H.</li>
        <li><b>HALT:</b> End program execution.</li>
      </ol>
    `,
    simulationType: 'assembly'
  },
  {
    id: 'exp-5',
    title: 'Multiply Two 8-bit Numbers',
    aim: 'WAP to multiply two 8 bit numbers stored at memory location 2000 and 2001 and stores the result at memory location 2002 and 2003.',
    theory: `
      <p>Since early microprocessors lack a direct multiplication instruction, multiplication is often performed via repeated addition. The multiplier dictates how many times the multiplicand is added to the accumulator.</p>
    `,
    algorithm: `
      <ol>
        <li><b>INIT:</b> Clear the Accumulator and set a counter to the multiplier value.</li>
        <li><b>LOOP:</b> Add the multiplicand to the accumulator.</li>
        <li><b>TEST:</b> Decrement the counter. If not zero, jump to LOOP.</li>
        <li><b>STORE:</b> Store the lower byte of the result at 2002H and higher byte at 2003H.</li>
      </ol>
    `,
    simulationType: 'assembly'
  },
  {
    id: 'exp-6',
    title: 'Add Two 16-bit Numbers',
    aim: 'WAP to add two 16-bit numbers. Store the result at memory address starting from 2000.',
    theory: `
      <p>16-bit addition requires handling carry-overs from the lower byte addition into the higher byte addition. This uses Instructions like ADD for the lower byte and ADC (Add with Carry) for the higher byte.</p>
    `,
    algorithm: `
      <ol>
        <li><b>LOWER BYTE:</b> Load lower byte of Num 1, ADD lower byte of Num 2, store at 2000H.</li>
        <li><b>HIGHER BYTE:</b> Load higher byte of Num 1, ADC (Add with Carry) higher byte of Num 2.</li>
        <li><b>STORE:</b> Store the resulting higher byte at 2001H.</li>
      </ol>
    `,
    simulationType: 'assembly'
  },
  {
    id: 'exp-7',
    title: 'Bit Testing',
    aim: 'WAP which tests if any bit is \'0\' in a data byte specified at an address 2000. If it is so, 00 would be stored at address 2001 and if not so then FF should be stored.',
    theory: `
      <p>This program utilizes logical instructions such as AND or comparing with FFH to evaluate the bitwise state of a memory byte.</p>
    `,
    algorithm: `
      <ol>
        <li><b>FETCH:</b> Load data byte from 2000H.</li>
        <li><b>COMPARE:</b> Compare with FFH (All 1s).</li>
        <li><b>BRANCH:</b> If equal, store FFH at 2001H. Else, store 00H at 2001H.</li>
      </ol>
    `,
    simulationType: 'assembly'
  },
  {
    id: 'exp-8',
    title: 'Memory to Register Loading',
    aim: 'Write a program which loads register C with (2000), D with (2001), E with (2002) and A with (2001).',
    theory: `
      <p>Demonstrates direct and indirect memory addressing modes by manipulating memory pointers and transferring blocks of memory to internal CPU registers.</p>
    `,
    algorithm: `
      <ol>
        <li><b>LOAD C:</b> Move data from 2000H to Register C.</li>
        <li><b>LOAD A/D:</b> Move data from 2001H to Register A and D.</li>
        <li><b>LOAD E:</b> Move data from 2002H to Register E.</li>
      </ol>
    `,
    simulationType: 'assembly'
  },
  {
    id: 'exp-9',
    title: 'Block Increment',
    aim: 'Sixteen bytes of data are specified at consecutive data-memory locations starting at 2000. Write a program which increments the value of all sixteen bytes by 01.',
    theory: `
      <p>Introduces looping capabilities and pointer arithmetic (HL register pair acting as memory pointer) to manipulate large blocks of data efficiently.</p>
    `,
    algorithm: `
      <ol>
        <li><b>POINTER:</b> Point HL register pair to 2000H.</li>
        <li><b>COUNTER:</b> Set Register C to 10H (16 in decimal).</li>
        <li><b>LOOP:</b> Increment memory pointed by HL (INC M).</li>
        <li><b>ADVANCE:</b> Increment HL to point to next address and decrement C.</li>
        <li><b>TEST:</b> Jump to LOOP if C is not zero.</li>
      </ol>
    `,
    simulationType: 'assembly'
  },
  {
    id: 'exp-10',
    title: 'Block Array Addition',
    aim: 'WAP to add 10 bytes stored at memory location starting from 3000. Store the result at memory location 300A.',
    theory: `
      <p>An advanced loop demonstrating array summation. It requires careful management of accumulated values and potential overflow if the sum exceeds 8 bits (though often restricted to 8-bit sums in simple examples).</p>
    `,
    algorithm: `
      <ol>
        <li><b>INIT:</b> Clear Accumulator (Sum = 0), Set Pointer HL to 3000H, Set Counter to 0AH (10).</li>
        <li><b>LOOP:</b> Add M to A.</li>
        <li><b>ADVANCE:</b> Increment HL, Decrement Counter.</li>
        <li><b>FINISH:</b> If Counter != 0 go to LOOP, else store A at 300AH.</li>
      </ol>
    `,
    simulationType: 'assembly'
  }
];
