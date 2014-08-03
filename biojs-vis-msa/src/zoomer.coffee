module.exports =
  class Zoomer

    constructor: (@msa) ->

      @maxLabelLength = 20
      @setZoomLevel 2
      @len = 0

      @_setWidth()

    setZoomLevel: (value) ->
      @level = value

      @columnWidth = 1 * value
      @labelFontsize = Math.floor(3 + 0.8 * value)
      @residueFontsize = Math.floor(3 + 0.8 * value)
      @columnHeight = 5 + 1 * value
      @columnSpacing = 0

      if @maxLabelLength > 0
        @seqOffset = @maxLabelLength * @labelFontsize / 2 + 2 * value

      if value is 1
        @seqOffset = 20

    autofit: (tSeqs) ->
      level = @guessZoomLevel tSeqs
      @setZoomLevel level

    isTextVisible: ->
      if @labelFontsize > 5
        true
      else
        false

    getStepSize: ->
      stepSize = 1
      stepSize = 2  if @columnWidth <= 15
      stepSize = 5  if @columnWidth <= 5
      stepSize = 10  if @columnWidth is 2
      stepSize = 20  if @columnWidth is 1
      stepSize

    _setWidth: ->
      # totally slow - draws the entire container
      _rect = @msa.container.getBoundingClientRect()
      @_width = _rect.right - _rect.left

      # fix for inline-block - try parent
      if @_width is 0
        _rect = @msa.container.parentNode.getBoundingClientRect()
        @_width = _rect.right - _rect.left


    guessZoomLevel:(tSeqs) ->
      @len = @getMaxLength tSeqs
      @maxLabelLength =  @getMaxLabelLength tSeqs

      level = 2

      if @len > @_width
        # go to minzoom
        return 1
      else
        # increase as long as possible
        @setZoomLevel level
        while @msa.stage.width(@len) < @_width and level <= 100
          level++
          @setZoomLevel level

        if level is 2
          console.log "len: #{@len} - width: #{@_width}"
          console.log "stage: #{@msa.stage.width(@len)}"
          console.log "stage: #{@msa.container.id}"
        return level - 1


    getMaxLength: (seqs) ->
      nMax = 0

      if seqs?
        # input array
        for value in seqs
          if value?.seq?
            nMax = Math.max nMax, value.seq.length
      else
        # internal dict
        seqs = @msa.seqs
        for key,value of seqs
          nMax = Math.max nMax, value.tSeq.seq.length
      return nMax

    getMaxLabelLength: (seqs) ->
      nMax = 0

      if seqs?
        # input array
        for value in seqs
          if value?.name?
            nMax = Math.max nMax, value.name.length
      else
        # internal dict
        seqs = @msa.seqs
        for key,value of seqs
          nMax = Math.max nMax, value.tSeq.name.length
      return nMax
