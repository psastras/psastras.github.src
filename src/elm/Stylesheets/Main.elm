module Stylesheets.Main exposing (css)

import Css exposing (..)
import Css.Media exposing (mediaQuery)
import Css.Elements exposing (..)
import Css.Namespace exposing (namespace)
import SharedStyles exposing (..)


css : Stylesheet
css =
    (stylesheet << namespace mainNamespace.name)
        [ html
            [ margin zero
            , padding zero
            ]
        , body
            [ margin zero
            , padding zero
            , fontFamilies [ "Roboto" ]
            , lineHeight (Css.em 1.15)
            , color (rgb 10 10 10)
            , fontSize (px 18)
            ]
        , a
            [ color (rgb 50 220 100)
            ]
        , p
            [ paddingTop (Css.rem 0)
            , paddingBottom (Css.rem 1)
            , lineHeight (Css.em 1.65)
            ]
        , Css.Elements.pre
            [ maxWidth (Css.rem 80)
            , overflow scroll
            , backgroundColor (rgb 240 240 240)
            , padding (Css.rem 2)
            , borderRadius (Css.rem 0.5)
            ]
        , each [ h1, h2, h3, h4, h5, h6 ]
            [ fontWeight normal
            , fontFamilies [ "Roboto Slab" ]
            ]
        , h1 [ fontSize (Css.rem 1.5) ]
        , h2 [ fontSize (Css.rem 1.2) ]
        , h3
            [ margin (Css.rem 0.25)
            , fontSize (Css.rem 0.9)
            ]
        , class Container
            [ displayFlex
            , height (vh 100)
            , width (vw 100)
            ]
        , class PageContainer
            [ overflowY scroll
            , property "-webkit-overflow-scrolling" "touch"
            , width (pct 100)
            , backgroundImage (url "../img/bg.jpg")
            , backgroundSize cover
            ]
        , class Page
            [ minHeight (vh 100)
            ]
        , class PageHeader
            [ fontFamilies [ "Roboto Slab" ]
            , minHeight (vh 80)
            , displayFlex
            , color (rgb 255 255 255)
            , justifyContent flexEnd
            , alignItems flexEnd
            , backgroundColor (rgba 0 0 0 0.4)
            , paddingLeft (Css.rem 1)
            , paddingRight (Css.rem 1)
            , flexDirection column
            ]
        , class PageHeaderRow
            [ maxWidth (Css.rem 40)
            , width (pct 100)
            , marginLeft auto
            , marginRight auto
            , displayFlex
            , alignItems center
            , justifyContent center
            ]
        , class PageHeaderText
            [ width (pct 100)
            , displayFlex
            , flexDirection column
            , padding2 (Css.rem 1) zero
            , children
                [ h1
                    [ marginTop zero
                    ]
                , span
                    [ padding (Css.rem 0.25)
                    ]
                ]
            ]
        , class PageContent
            [ backgroundColor (rgb 250 250 250)
            , flex auto
            , displayFlex
            , justifyContent center
            , minHeight (vh 100)
            ]
        , class PageContentText
            [ maxWidth (Css.rem 40)
            , width (pct 100)
            , padding (Css.rem 1)
            ]
        , class PageHeaderAvatar
            [ width (Css.rem 4)
            , height (Css.rem 4)
            , borderRadius (pct 50)
            , marginBottom (Css.rem 2)
            , border3 (Css.rem 0.25) solid (rgb 255 255 255)
            , property "visibility" "hidden"
            ]
        , mediaQuery [ "screen and ( min-width: 480px )" ]
            [ h1 [ fontSize (Css.rem 2.2) ]
            , h2 [ fontSize (Css.rem 1.7) ]
            , h3 [ fontSize (Css.rem 1.2) ]
            , class PageHeaderAvatar
                [ property "visibility" "visible"
                ]
            ]
        ]
