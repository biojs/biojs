Utils = require "../utils/general"
selection = require "../selection/index"
StageElement = require "./StageElement"

module.exports =
  class FeatureElement extends StageElement

    constructor: (@msa) ->
      undefined

    width: (n) ->
      return 0

    redraw: (el,row,textVisibilityChanged) ->
      parentNode = row.layer
      #parentNode = el.parentNode
      console.log "redrawing"
      foo = @create row
      parentNode.replaceChild foo,el

    create: (row) ->
      tSeq = row.tSeq
      features = tSeq.features
      featureSpan = document.createElement "span"


      if features? and features?.length > 0

        features = FeatureElement.sortFeatureArray features

        seqLen = tSeq.seq.length
        rowsNeeded = FeatureElement.getMinRows features, seqLen
        # an arr for each row
        occs = (document.createDocumentFragment() for x in [1..rowsNeeded])

        # loop over all annotations
        for feature in features
          rect = @drawRectangle feature
          # look for an row to put in
          for occ in occs
            occLength = occ.childNodes.length
            if occLength is 0 or occ.childNodes[occLength - 1]?.xEnd < feature.xStart
              if occLength > 0
                rect.style.marginLeft = "#{@msa.zoomer.columnWidth * (feature.xStart - 1 - occ.childNodes[occLength - 1].xEnd)}px"
              else if occLength is 0
                rect.style.marginLeft = "#{@msa.zoomer.columnWidth * (feature.xStart)}px"
              occ.appendChild rect
              break

        # post all annotations
        residueGroup = document.createDocumentFragment()
        for occ in occs
          rowSpan = document.createElement "span"
          rowSpan.className = "biojs-msa-feature-row"

          if @msa.config.visibleElements.labels
            labelOffset = document.createElement "span"
            labelOffset.style.width = "#{@msa.zoomer.seqOffset}px"
            rowSpan.appendChild labelOffset

          rowSpan.appendChild occ
          residueGroup.appendChild rowSpan

        featureSpan.className = "biojs-msa-feature"
        featureSpan.appendChild residueGroup

      # TODO: what should we return here?
      return featureSpan

    # draws a single feature
    drawRectangle: (feature) ->
      residueSpan = document.createElement "span"
      if feature.text?.length > 0
        residueSpan.textContent = feature.text
      else
        residueSpan.textContent = "#"

      # bgcolor
      bgColor = Utils.hex2rgb(feature.fillColor)
      residueSpan.style.backgroundColor = Utils.rgba bgColor, feature.fillOpacity
      residueSpan.bgColor = bgColor

      #border
      borderColor = feature.borderColor
      residueSpan.style.border =  "#{feature.borderSize}px solid #{borderColor}"

      # other
      residueSpan.style.width = "#{@msa.zoomer.columnWidth * (feature.xEnd - feature.xStart + 1)}px"
      residueSpan.style.fontSize = "#{@msa.zoomer.residueFontsize}px"

      # save end property
      residueSpan.xEnd = feature.xEnd


      # events
      residueSpan.addEventListener "mouseover", ->
        opacity = 1
        this.style.backgroundColor = Utils.rgba this.bgColor, opacity

      residueSpan.addEventListener "mouseout", ->
        opacity = 0.5
        this.style.backgroundColor = Utils.rgba this.bgColor, opacity

      return residueSpan

    # sort the feature array after the start property
    @sortFeatureArray: (arr) ->

      compare = (a,b) ->
        if a.xStart < b.xStart
          return -1
        else if a.xStart > b.xStart
          return 1
        return

      arr.sort compare

    # calculates how many rows are needed
    @getMinRows: (features, seqLen) ->

      occs = (0 for x in [1..seqLen])

      for feature in features
        for x in [feature.xStart..feature.xEnd] by 1
          occs[x]++

      max = 0
      for x in [0..seqLen - 1] by 1
        max = occs[x] if occs[x] > max

      return max
