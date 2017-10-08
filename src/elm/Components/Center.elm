module Components.Center exposing (center)

import SharedStyles exposing (..)
import Html exposing (..)


{ id, class, classList } =
    mainNamespace


center : Html msg -> Html msg
center html =
    div [ class [ Centered ] ]
        [ html ]
