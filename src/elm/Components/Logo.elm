module Components.Logo exposing (logo)

import SharedStyles exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


{ id, class, classList } =
    logoNamespace



-- VIEW


logo : Html msg
logo =
    div [ class [ LogoContainer ] ]
        [ h1 [] [ text ("Developer.") ] ]
