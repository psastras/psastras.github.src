module Pages.NotFound exposing (notFound)

import Components.Center exposing (center)
import SharedStyles exposing (..)
import Html exposing (..)


{ id, class, classList } =
    mainNamespace


notFound : Html msg
notFound =
    div [ class [ Page ] ]
        [ center (h1 [] [ text ("Page Not Found") ])
        ]
