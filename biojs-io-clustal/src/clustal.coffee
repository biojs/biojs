Str = require("./strings")
GenericReader = require("./generic_reader")
Seq = require("./seq")

module.exports =
class Clustal extends GenericReader

  @parse: (text) ->
    seqs = []

    lines = text.split("\n")
    # The first line in the file must start with the words "CLUSTAL"
    if lines[0][0..5] is not "CLUSTAL"
      throw new Error "Invalid CLUSTAL Header"

    k = 0
    # 0: reading sequences, 1: reading new lines
    blockstate = 1
    # count the sequence for every block
    seqCounter = 0


    while k < lines.length
      k++
      line = lines[k]

      if not line? or line.length is 0
        blockstate = 1
        continue

      # okay we have an empty line
      if line.trim().length is 0
        blockstate = 1
        continue
      else
        # ignore annotations
        if Str.contains line , "*"
          continue
        if blockstate is 1
          # new block recognized - reset
          seqCounter = 0
          blockstate = 0

        regex = /^(?:\s*)(\S+)(?:\s+)(\S+)(?:\s*)(\d*)(?:\s*|$)/g
        match = regex.exec(line)
        if match?
          label = match[1]
          sequence = match[2]

          # check for the first block
          if seqCounter >= seqs.length
            seqs.push new Seq(sequence, label, seqCounter)
          else
            seqs[seqCounter].seq += sequence

          seqCounter++
        else
          console.log line

    return seqs
