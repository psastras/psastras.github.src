module Stylesheets.Components.Nav exposing (css)

import Css exposing (..)
import Css.Elements exposing (..)
import Css.Namespace exposing (namespace)
import SharedStyles exposing (..)


css : Stylesheet
css =
    (stylesheet << namespace navNamespace.name)
        [ class Nav
            [ backgroundColor (rgb 22 22 22)
            , displayFlex
            , flexDirection column
            , padding2 (Css.rem 1) (Css.rem 0.5)
            , color (rgb 50 220 100)
            , fontSize (Css.rem 1.5)
            , children
                [ i
                    [ padding (Css.rem 0.5)
                    , display block
                    ]
                , a
                    [ color (rgb 180 180 180)
                    , padding (Css.rem 0.5)
                    , display block
                    , visited
                        [ color (rgb 180 180 180)
                        ]
                    , hover
                        [ color (rgb 255 255 255)
                        ]
                    ]
                ]
            ]
        , class NavAvatar
            [ width (Css.rem 2)
            , height (Css.rem 2)
            , borderRadius (pct 50)
            , marginBottom (Css.rem 1)
            , border3 (Css.rem 0.2) solid (rgb 255 255 255)
            ]
        ]
